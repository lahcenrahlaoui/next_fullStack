"use client";

import { useRef, useEffect, useState } from "react";
import "@google/model-viewer";

export default function ModelViewer({ fileUrl }) {
    const modelRef = useRef(null);
    const [showModel, setShowModel] = useState(false);

    useEffect(() => {
        const modelViewer = modelRef.current;

        modelViewer?.addEventListener('load', () => {
            console.log('Model loaded successfully!');
            setShowModel(true);

            setTimeout(() => {
                // Smooth scale animation
                let scaleValue = 1;  
                const targetScale = 1.4;  
                const duration = 1000;  
                const steps = 100;  
                const increment = (targetScale - scaleValue) / steps;  
                const interval = duration / steps;  

                const scaleInterval = setInterval(() => {
                    scaleValue += increment; // Increase scale
                    modelViewer.setAttribute('scale', `${scaleValue} ${scaleValue} ${scaleValue}`);
                    
                    if (scaleValue >= targetScale) {
                        clearInterval(scaleInterval); // Stop when target is reached
                    }
                }, interval);
                
                // Set the camera orbit after the scale animation
                setTimeout(() => {
                    modelViewer.setAttribute('camera-orbit', '0deg 90deg 50m');
                }, duration); // Same duration as the scaling
            }, 500); // Time before execution
        });

        modelViewer?.addEventListener('error', (error) => {
            console.error('Error loading model:', error);
            console.error('Error details:', error.detail);
        });

        return () => {
            modelViewer?.removeEventListener('load', () => {
                console.log('Model loaded successfully!');
            });
            modelViewer?.removeEventListener('error', (error) => {
                console.error('Error loading model:', error);
            });
        };
    }, [fileUrl]);

    return (
        <div className="w-full h-96 flex items-center justify-center">
            {!showModel && (
                <div className="flex items-center justify-center h-screen w-screen ">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-[#FFB800]"></div>
                </div>
            )}
            <model-viewer
                ref={modelRef}
                src={fileUrl}
                alt="A 3D model"
                auto-rotate
                camera-controls
                style={{ width: '100%', height: '100%' }}
            />
        </div>
    );
}
