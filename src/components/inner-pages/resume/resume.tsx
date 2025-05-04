import React, { useState } from 'react';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import HeaderOne from '../../../layouts/headers/HeaderOne';
import FooterOne from '../../../layouts/footers/FooterOne';

const ResumePage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [downloadFormat, setDownloadFormat] = useState<'pdf' | 'word'>('pdf'); // <- new

  const handlePDFUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setSummary(response.data.summary);
    } catch (error) {
      console.error('PDF upload error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTextSummarize = async () => {
    if (!text.trim()) return;

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/summarize-text', { text });
      setSummary(response.data.summary);
    } catch (error) {
      console.error('Text summarization error:', error);
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = (summary: string) => {
    const doc = new jsPDF();
    doc.text(summary, 10, 10);
    doc.save('summary.pdf');
  };

  const downloadWord = async (summary: string) => {
    try {
      const response = await fetch('/assets/template.docx');
      if (!response.ok) throw new Error('Failed to fetch template.docx');
      const arrayBuffer = await response.arrayBuffer();

      const zip = new PizZip(arrayBuffer);
      const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
      });

      doc.setData({ summary });
      doc.render();

      const buf = doc.getZip().generate({
        type: 'blob',
        mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      });

      const url = window.URL.createObjectURL(buf);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'summary.docx';
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating Word file:', error);
    }
  };

  const handleDownload = () => {
    if (downloadFormat === 'pdf') {
      downloadPDF(summary);
    } else {
      downloadWord(summary);
    }
  };

  return (
    <>
      <HeaderOne />

      <div className="container py-5">
        <h2 className="text-center mb-5">📝 Automatic Summarizer</h2>

        {/* PDF Upload Section */}
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title mb-3">Upload a PDF file</h5>
            <div className="mb-3">
              <input
                type="file"
                accept=".pdf"
                className="form-control"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
            </div>
            <button
              onClick={handlePDFUpload}
              className="btn btn-primary"
              disabled={loading}
            >
              Summarize PDF
            </button>
          </div>
        </div>

        {/* Text Input Section */}
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title mb-3">Or paste your text</h5>
            <div className="mb-3">
              <textarea
                className="form-control"
                rows={4}
                placeholder="Enter your text here..."
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </div>
            <button
              onClick={handleTextSummarize}
              className="btn btn-success"
              disabled={loading}
            >
              Summarize Text
            </button>
          </div>
        </div>

        {/* Loading Spinner */}
        {loading && (
          <div className="text-center my-4">
            <div className="spinner-border text-secondary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2">Generating summary...</p>
          </div>
        )}

        {/* Summary Output */}
        {summary && (
          <div className="alert alert-info mt-4" role="alert">
            <h5 className="alert-heading">Summary</h5>
            <p className="mb-0">{summary}</p>

            {/* Download Controls */}
            <div className="text-center mt-4 d-flex justify-content-center align-items-center gap-3">
              <select
                className="form-select w-auto"
                value={downloadFormat}
                onChange={(e) => setDownloadFormat(e.target.value as 'pdf' | 'word')}
              >
                <option value="pdf">PDF</option>
                <option value="word">Word</option>
              </select>
              <button className="btn btn-primary" onClick={handleDownload}>
                Download Summary
              </button>
            </div>
          </div>
        )}
      </div>

      <FooterOne />
    </>
  );
};

export default ResumePage;
