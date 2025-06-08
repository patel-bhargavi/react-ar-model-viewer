import React, { useEffect, useRef, useState } from 'react'
import VariantSelector from './VariantSelector'
import Loader from './Loader'
import '@google/model-viewer'
import url from '../assets/human.glb';

type Variant = {
    variant_id: string;
    color: string;
    code: string;
}

export const WorkingModelViewer: React.FC = () => {
    const [color, setColor] = useState<string>('#ffffff')
    const [selectedVariantId, setSelectedVariantId] = useState('')
    const [canActivateAR, setCanActivateAR] = useState<boolean>(false)
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    const ar_view_variants = [
        {
            color: "Black",
            code: "#000000",
            variant_id: "01"
        },
        {
            color: "White",
            code: "#FFFFFF",
            variant_id: "02"
        },
        {
            color: "Charcoal Gray",
            code: "#333333",
            variant_id: "03"
        },
        {
            color: "Stone Gray",
            code: "#7D7D7D",
            variant_id: "04"
        },
        {
            color: "Ivory",
            code: "#F9F9F6",
            variant_id: "05"
        },
        {
            color: "Navy Blue",
            code: "#1A2B3C",
            variant_id: "06"
        },
        {
            color: "Olive",
            code: "#556B2F",
            variant_id: "07"
        },
        {
            color: "Taupe",
            code: "#8B8589",
            variant_id: "08"
        }
    ];

    useEffect(() => {
        setCanActivateAR(isMobile)
    }, [])

    const modelViewerRef = useRef<any>(null)

    const handleVariantChange = (variant: Variant) => {
        setColor(variant.code)
        setSelectedVariantId(variant.variant_id)

        const modelViewer = modelViewerRef.current
        if (modelViewer) {
            const material = modelViewer.model?.materials?.[0]
            if (material) {
                material.pbrMetallicRoughness.setBaseColorFactor(hexToRgba(variant.code))
            }
        }
    }

    const hexToRgba = (hex: string) => {
        const bigint = parseInt(hex.replace('#', ''), 16)
        const r = ((bigint >> 16) & 255) / 255
        const g = ((bigint >> 8) & 255) / 255
        const b = (bigint & 255) / 255
        return [r, g, b, 1]
    }

    const onModelLoaded = () => {
        const modelViewer = modelViewerRef.current
        if (modelViewer) {
            const material = modelViewer.model?.materials?.[0]
            if (material) {
                material.pbrMetallicRoughness.setBaseColorFactor(hexToRgba(color))
            }
        }
    }

    const triggerAR = () => {
        if (canActivateAR && modelViewerRef.current) {
            modelViewerRef.current.activateAR()
        }
    }

    if (!url) {
        return <Loader />
    }

    return (
        <div
            style={{
                position: 'relative', // enable absolute children
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '16px',
                padding: '16px 0 16px 0',
                height: '100vh',
                boxSizing: 'border-box',
            }}
        >

            {/* 3D Model Viewer */}
            <model-viewer
                ref={modelViewerRef}
                src={url}
                ar
                ar-modes="scene-viewer webxr quick-look"
                ar-scale="auto"
                shadow-intensity="0.5"
                shadow-softness="0.9"
                exposure="1"
                environment-image="neutral"
                camera-controls
                onLoad={onModelLoaded}
                style={{ width: '100%', height: '530px' }}
            />

            {/* Variant Selector */}
            {ar_view_variants && ar_view_variants.length > 0 && (
                <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <VariantSelector
                        variants={ar_view_variants}
                        selectedId={selectedVariantId}
                        onChange={handleVariantChange}
                    />
                </div>
            )}

            {/* AR Button */}
            <button
                onClick={triggerAR}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 20px',
                    fontSize: '16px',
                    borderRadius: '8px',
                    backgroundColor: canActivateAR ? '#2563eb' : '#cbd5e1',
                    color: '#fff',
                    border: 'none',
                    cursor: canActivateAR ? 'pointer' : 'not-allowed',
                    opacity: canActivateAR ? 1 : 0.6,
                }}
            >
                <img
                    src="/ARIcon.svg"
                    alt="AR Icon"
                    style={{ width: '20px', height: '20px' }}
                />
                Visualize in Your Space
            </button>
        </div>
    )
}