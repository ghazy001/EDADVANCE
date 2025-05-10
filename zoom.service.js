// zoom.service.js
const fetch = require("node-fetch");
const base64 = require("base-64");

// Use environment variables for Zoom credentials
const zoomAccountId = process.env.ZOOM_ACCOUNT_ID;
const zoomClientId = process.env.ZOOM_CLIENT_ID;
const zoomClientSecret = process.env.ZOOM_CLIENT_SECRET;

const getAuthHeaders = () => {
  return {
    Authorization: `Basic ${base64.encode(`${zoomClientId}:${zoomClientSecret}`)}`,
    "Content-Type": "application/json",
  };
};

const generateZoomAccessToken = async () => {
  try {
    const response = await fetch(
      `https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${zoomAccountId}`,
      {
        method: "POST",
        headers: getAuthHeaders(),
      }
    );
    const jsonResponse = await response.json();
    if (!jsonResponse.access_token) {
      throw new Error("Failed to generate Zoom access token");
    }
    return jsonResponse.access_token;
  } catch (error) {
    console.error("generateZoomAccessToken Error --> ", error);
    throw error;
  }
};

const generateZoomMeeting = async (courseId = null) => {
  try {
    const zoomAccessToken = await generateZoomAccessToken();
    const meetingPayload = {
      agenda: courseId ? `Zoom Meeting for Course ${courseId}` : "Zoom Meeting for Elearning Demo",
      duration: 60,
      password: "12345",
      settings: {
        allow_multiple_devices: true,
        host_video: true,
        join_before_host: true,
        mute_upon_entry: true,
        participant_video: true,
        waiting_room: false,
      },
      start_time: new Date().toISOString(),
      timezone: "Africa/Tunis",
      topic: courseId ? `Zoom Meeting for Course ${courseId}` : "Zoom Meeting for Elearning Demo",
      type: 2, // Scheduled Meeting
    };

    const response = await fetch(`https://api.zoom.us/v2/users/me/meetings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${zoomAccessToken}`,
      },
      body: JSON.stringify(meetingPayload),
    });

    const jsonResponse = await response.json();
    if (!response.ok) {
      throw new Error(jsonResponse.message || "Failed to create Zoom meeting");
    }
    return jsonResponse; // Return the meeting data (includes join_url, id, etc.)
  } catch (error) {
    console.error("generateZoomMeeting Error --> ", error);
    throw error;
  }
};

module.exports = { generateZoomMeeting };