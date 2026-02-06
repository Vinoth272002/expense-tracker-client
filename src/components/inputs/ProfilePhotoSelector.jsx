import { useRef, useState } from "react";
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

const ProfilePhotoSelector = ({ image, setImage }) => {
    const inputRef = useRef(null);

    const [ previewUrl, setPreviewUrl ] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        
        if (file) {
            setImage(file);
        }

        const preview = URL.createObjectURL(file);
        setPreviewUrl(preview);
    }

    const handleRemoveImage = () => {
        setImage(null);
        setPreviewUrl(null);
    }

    const onChooseFile = () => {
        inputRef.current.click();
    }

    return (
        <div className="flex justify-center mb-6">
            <input type="file" accept="image/*" className="hidden" ref={ inputRef } onChange={ handleImageChange }/>

            {
                !image ? (
                    <div className="w-20 h-20 flex items-center justify-center cursor-pointer bg-purple-100 rounded-full relative" onClick={ onChooseFile }>
                        <LuUser className="text-4xl text-primary"></LuUser>
                        <button type="button" className="w-8 h-8 flex items-center justify-center cursor-pointer bg-primary text-white rounded-full absolute -bottom-1 -right-1">
                            <LuUpload/>
                        </button>
                    </div>
                ) : (
                    <div className="relative group">
                        <img src={ previewUrl } alt="Profile photo" className="w-20 h-20 rounded-full cursor-pointer object-cover" onClick={ onChooseFile }/>
                        <button type="button" className="w-8 h-8 flex items-center justify-center cursor-pointer bg-red-500 text-white rounded-full absolute -bottom-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200" onClick={ handleRemoveImage }>
                            <LuTrash/>
                        </button>
                    </div>
                )
            }
        </div>
    )
}

export default ProfilePhotoSelector