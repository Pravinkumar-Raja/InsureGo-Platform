// src/utils/api.ts
import axios from 'axios'; 

// Base URL for your Spring Boot application
const API_BASE_URL = 'http://localhost:8760/api/auth';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000, // 10 second timeout
});

interface ApiResponse {
    message?: string;
    token?: string;
    email?: string;
    role?: string;
}

interface PostData {
    [key: string]: any;
}

export const postApi = async (endpoint: string, data: PostData): Promise<ApiResponse> => {
    try {
        const response = await apiClient.post<ApiResponse>(endpoint, data);
        return response.data;
    } catch (error) {
        // Use robust runtime check for server response
        const serverResponse = (error as any).response; 
        
        if (serverResponse) {
            const serverErrorData = serverResponse.data;
            
            let errorMessage = 'An unknown API error occurred.';

            if (typeof serverErrorData === 'string') {
                errorMessage = serverErrorData;
            } else if (serverErrorData && typeof serverErrorData === 'object' && 'message' in serverErrorData) {
                errorMessage = (serverErrorData as { message: string }).message;
            } else if (serverResponse.status) {
                errorMessage = `Server responded with status ${serverResponse.status}.`;
            }

            throw new Error(errorMessage);
        }
        
        throw new Error('Network error or request timed out.');
    }
};