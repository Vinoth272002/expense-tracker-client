import api from "../services/api";

const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
        const UPLOAD_URL = "/upload-file";

        // if (api.defaults.baseURL) {
        //     const baseUrlWithoutVersion = api.defaults.baseURL.replace("/v1", "");
        //     uploadUrl = `${baseUrlWithoutVersion}/upload-file`;
        // }

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
