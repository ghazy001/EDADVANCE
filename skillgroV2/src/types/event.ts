interface EventType {
    date: string;
    studentCount: number;
    [key: string]: any; // permet d'accepter d'autres props si besoin
}