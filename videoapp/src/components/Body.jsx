import { RiInboxUnarchiveLine } from "react-icons/ri";
import { useRef, useState } from "react";

function Body() {
    const fileInputRef = useRef(null);
    const [videoSrc, setVideoSrc] = useState(null);
    const [videoUrl, setVideoUrl] = useState("");
    const [embedUrl, setEmbedUrl] = useState("");

    const handleDivClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const videoURL = URL.createObjectURL(file);
            setVideoSrc(videoURL);
            setEmbedUrl("");
        }
    };

    const handleUrlChange = (event) => {
        setVideoUrl(event.target.value);
    };

    const handleUrlSubmit = (event) => {
        event.preventDefault();
        const url = videoUrl;
        let embedUrl = "";

        if (url.includes("youtube.com") || url.includes("youtu.be")) {
            const videoId = url.split("v=")[1] || url.split("/")[3];
            embedUrl = `https://www.youtube.com/embed/${videoId.split("&")[0]}`;
        } else if (url.includes("twitter.com")) {
            embedUrl = `https://twitframe.com/show?url=${encodeURIComponent(url)}`;
        }

        if (embedUrl) {
            setEmbedUrl(embedUrl);
            setVideoSrc("");
        } else {
            alert("La URL proporcionada no es válida para YouTube o Twitter.");
        }
    };

    return (
        <main className="w-full h-full flex justify-center items-center flex-col mt-8">
            <h1 className="text-3xl font-bold text-green-800">¡Recorta tu video completamente gratis!</h1>
            <div 
                className="w-[800px] h-[450px] mt-4 border-dashed border-2 border-indigo-600 flex items-center justify-center bg-slate-100 cursor-pointer"
                onClick={handleDivClick}
            >
                {videoSrc ? (
                    <video className="w-full h-full" controls>
                        <source src={videoSrc} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                ) : embedUrl ? (
                    <iframe
                        className="w-full h-full"
                        src={embedUrl}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                ) : (
                    <div className="text-slate-500 flex-col justify-center items-center">
                        <h3 className="flex justify-center items-center text-lg font-semibold">
                            <RiInboxUnarchiveLine className="mr-2 text-xl" /> Subí tu video
                        </h3>
                        <h4 className="flex justify-center items-center text-md">Abrir Archivos</h4>
                    </div>
                )}
            </div>
            <input 
                type="file" 
                accept="video/*" 
                ref={fileInputRef} 
                style={{ display: 'none' }} 
                onChange={handleFileChange} 
            />
            <form onSubmit={handleUrlSubmit} className="w-[700px] h-7 border-1 mt-4 flex">
                <input 
                    type="url" 
                    placeholder="Ingrese una URL" 
                    value={videoUrl}
                    onChange={handleUrlChange}
                    className="w-full px-2"
                />
                <button type="submit" className="ml-2 px-4 bg-green-600 text-white">Cargar</button>
            </form>
        </main>
    );
}

export default Body;

