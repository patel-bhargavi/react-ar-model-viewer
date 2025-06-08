declare module "*.glb" {
    const value: string;
    export default value;
}

declare module "*.gltf" {
    const value: string;
    export default value;
}

// src/global.d.ts
declare namespace JSX {
    interface IntrinsicElements {
        'model-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
            src?: string;
            alt?: string;
            ar?: boolean;
            'ar-modes'?: string;
            'auto-rotate'?: boolean;
            'camera-controls'?: boolean;
            'shadow-intensity'?: string;
            'exposure'?: string;
            style?: React.CSSProperties;
        };
    }
}
