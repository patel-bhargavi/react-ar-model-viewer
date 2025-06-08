import React, { useEffect, useRef, useState } from 'react'
import { IoIosArrowDown } from "react-icons/io"

type Variant = {
    color: string
    code: string
    variant_id: string
}

type VariantSelectorProps = {
    variants: Variant[]
    selectedId: string
    onChange: (variant: Variant) => void
}

const VariantSelector: React.FC<VariantSelectorProps> = ({ variants, selectedId, onChange }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [dropUp, setDropUp] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    const uniqueVariants = Array.from(new Map(variants.map(v => [v.variant_id, v])).values())
    const selectedVariant = uniqueVariants.find(v => v.variant_id === selectedId)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isOpen])

    useEffect(() => {
        if (isOpen && dropdownRef.current) {
            const rect = dropdownRef.current.getBoundingClientRect()
            const spaceBelow = window.innerHeight - rect.bottom
            const spaceAbove = rect.top
            const estimatedDropdownHeight = 200
            setDropUp(spaceBelow < estimatedDropdownHeight && spaceAbove > estimatedDropdownHeight)
        }
    }, [isOpen])

    return (
        <div ref={dropdownRef} style={{ position: 'relative', width: '180px', fontFamily: 'sans-serif' }}>
            <div
                onClick={() => setIsOpen(prev => !prev)}
                style={{
                    padding: '5px 14px',
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    backgroundColor: '#fff',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '14px',
                    color: selectedVariant ? '#333' : '#999',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                    height: '36px'
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {selectedVariant ? (
                        <>
                            <div
                                style={{
                                    width: '24px',
                                    height: '24px',
                                    borderRadius: '6px',
                                    backgroundColor: selectedVariant.code,
                                    border: '1px solid #ccc'
                                }}
                            />
                            <span>{selectedVariant.color}</span>
                        </>
                    ) : (
                        <span>Select Variant</span>
                    )}
                </div>
                <IoIosArrowDown
                    style={{
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.2s ease-in-out',
                        fontSize: '18px',
                        color: '#888'
                    }}
                />
            </div>


            {isOpen && (
                <div
                    style={{
                        position: 'absolute',
                        [dropUp ? 'bottom' : 'top']: '100%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        minWidth: '220px',
                        backgroundColor: '#fff',
                        border: '1px solid #ccc',
                        borderRadius: '8px',
                        marginTop: dropUp ? undefined : '6px',
                        marginBottom: dropUp ? '6px' : undefined,
                        maxHeight: '600px',
                        overflowY: 'auto',
                        zIndex: 10,
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                    }}
                >
                    {uniqueVariants.map((variant) => (
                        <div
                            key={variant.variant_id}
                            onClick={() => {
                                onChange(variant)
                                setIsOpen(false)
                            }}
                            style={{
                                padding: '10px 30px',
                                margin: '4px 0',
                                borderRadius: '6px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '15px',
                                cursor: 'pointer',
                                fontSize: '14px',
                                transition: 'background 0.2s ease',
                            }}
                            onMouseEnter={(e) => {
                                (e.currentTarget as HTMLDivElement).style.background = '#f9f9f9'
                            }}
                            onMouseLeave={(e) => {
                                (e.currentTarget as HTMLDivElement).style.background = 'transparent'
                            }}
                        >
                            <div
                                style={{
                                    width: '30px',
                                    height: '30px',
                                    borderRadius: '10px',
                                    backgroundColor: variant.code,
                                    border: '1px solid #ccc'
                                }}
                            />
                            <span style={{ fontSize: '15px' }}>
                                {variant.color.toUpperCase()}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default VariantSelector
