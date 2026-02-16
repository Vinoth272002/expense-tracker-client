import api from "../services/api";

const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
        let UPLOAD_URL = `http://localhost:8080/api/upload-file`;

        if (api.defaults.baseURL) {
            const baseUrlWithoutVersion = api.defaults.baseURL.replace("/v1", "");
            UPLOAD_URL = `${baseUrlWithoutVersion}upload-file`;
        }

        const response = await api.post(UPLOAD_URL, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return response.data;
    } catch (error) {
        console.error("Error uploading image:", error);
        throw error;
    }
};

export default uploadImage;
