declare module '@faceio/fiojs' {
    // Interface pour les options de enroll
    interface EnrollOptions {
        locale?: string;
        payload?: Record<string, any>;
    }

    // Interface pour la réponse de enroll
    interface EnrollResponse {
        facialId: string;
    }

    // Interface pour les options de authenticate
    interface AuthenticateOptions {
        locale?: string;
    }

    // Interface pour la réponse de authenticate
    interface AuthenticateResponse {
        facialId: string;
    }

    // Interface pour l'instance FaceIO
    export interface FaceIO {
        enroll(options: EnrollOptions): Promise<EnrollResponse>;
        authenticate(options?: AuthenticateOptions): Promise<AuthenticateResponse>;
    }

    // Définir la classe exportée par défaut
    const faceIO: {
        new (publicId: string): FaceIO;
    };
    export default faceIO;
}