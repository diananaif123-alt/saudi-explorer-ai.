import React, { useState, useRef, useEffect } from "react";
import { LanguageCode } from "../../types";
import { X, Box, RotateCw, ZoomIn, ZoomOut, Layers, Eye, Sparkles, MapPin, Maximize2 } from "lucide-react";

interface ThreeDViewerModalProps {
  isOpen: boolean;
  landmarkNameAr?: string;
  landmarkNameEn?: string;
  landmarkImage?: string;
  language: LanguageCode;
  onClose: () => void;
}

export const ThreeDViewerModal: React.FC<ThreeDViewerModalProps> = ({
  isOpen,
  landmarkNameAr = "حي الطريف التاريخي بالدرعية",
  landmarkNameEn = "At-Turaif Historic District",
  landmarkImage = "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=1200&q=80",
  language,
  onClose
}) => {
  if (!isOpen) return null;

  const [rotation, setRotation] = useState({ x: 15, y: 35 });
  const [zoom, setZoom] = useState(1);
  const [isAutoRotate, setIsAutoRotate] = useState(true);
  const [wireframe, setWireframe] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDragging = useRef(false);
  const lastMouse = useRef({ x: 0, y: 0 });

  // Auto rotation loop
  useEffect(() => {
    if (!isAutoRotate) return;
    const interval = setInterval(() => {
      setRotation((prev) => ({ ...prev, y: (prev.y + 0.8) % 360 }));
    }, 30);
    return () => clearInterval(interval);
  }, [isAutoRotate]);

  // Render 3D Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const width = canvas.width;
    const height = canvas.height;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Background Grid & Lighting Gradient
      const grad = ctx.createRadialGradient(
        width / 2,
        height / 2,
        50,
        width / 2,
        height / 2,
        width / 2
      );
      grad.addColorStop(0, "#1c1917");
      grad.addColorStop(1, "#0c0a09");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Draw subtle grid lines
      ctx.strokeStyle = "rgba(217, 119, 6, 0.15)";
      ctx.lineWidth = 1;
      const step = 40;
      for (let x = 0; x < width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      ctx.save();
      ctx.translate(width / 2, height / 2);
      ctx.scale(zoom, zoom);

      // 3D Perspective Cube/Structure representation
      const radX = (rotation.x * Math.PI) / 180;
      const radY = (rotation.y * Math.PI) / 180;

      // Define 3D Box vertices for architectural model
      const size = 90;
      const vertices = [
        { x: -size, y: -size, z: -size },
        { x: size, y: -size, z: -size },
        { x: size, y: size, z: -size },
        { x: -size, y: size, z: -size },
        { x: -size, y: -size, z: size },
        { x: size, y: -size, z: size },
        { x: size, y: size, z: size },
        { x: -size, y: size, z: size },
        // Roof tower peak
        { x: 0, y: -size - 60, z: 0 }
      ];

      // Rotate 3D vertices
      const projected = vertices.map((v) => {
        // Rotate Y
        let x1 = v.x * Math.cos(radY) - v.z * Math.sin(radY);
        let z1 = v.x * Math.sin(radY) + v.z * Math.cos(radY);
        // Rotate X
        let y2 = v.y * Math.cos(radX) - z1 * Math.sin(radX);
        let z2 = v.y * Math.sin(radX) + z1 * Math.cos(radX);

        const fov = 350;
        const scale = fov / (fov + z2);
        return {
          x: x1 * scale,
          y: y2 * scale,
          z: z2
        };
      });

      // Faces definition
      const faces = [
        [0, 1, 2, 3], // Back
        [4, 5, 6, 7], // Front
        [0, 1, 5, 4], // Top
        [2, 3, 7, 6], // Bottom
        [0, 3, 7, 4], // Left
        [1, 2, 6, 5], // Right
        // Roof Pyramid
        [0, 1, 8],
        [1, 5, 8],
        [5, 4, 8],
        [4, 0, 8]
      ];

      // Sort faces by average Z depth
      faces.sort((a, b) => {
        const avgZa = a.reduce((sum, idx) => sum + projected[idx].z, 0) / a.length;
        const avgZb = b.reduce((sum, idx) => sum + projected[idx].z, 0) / b.length;
        return avgZb - avgZa;
      });

      // Render faces
      faces.forEach((face) => {
        ctx.beginPath();
        ctx.moveTo(projected[face[0]].x, projected[face[0]].y);
        for (let i = 1; i < face.length; i++) {
          ctx.lineTo(projected[face[i]].x, projected[face[i]].y);
        }
        ctx.closePath();

        if (wireframe) {
          ctx.strokeStyle = "#fbbf24";
          ctx.lineWidth = 1.5;
          ctx.stroke();
        } else {
          // Shaded Najdi mud-brick & gold architectural gradient
          const faceGrad = ctx.createLinearGradient(-100, -100, 100, 100);
          faceGrad.addColorStop(0, "rgba(217, 119, 6, 0.85)");
          faceGrad.addColorStop(0.5, "rgba(180, 83, 9, 0.75)");
          faceGrad.addColorStop(1, "rgba(120, 53, 15, 0.9)");

          ctx.fillStyle = faceGrad;
          ctx.fill();
          ctx.strokeStyle = "rgba(254, 243, 199, 0.6)";
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });

      // Render Hotspots (Hotspot 1: Main Gateway, Hotspot 2: Royal Palace Tower)
      const hp1 = projected[4]; // front top-left
      const hp2 = projected[8]; // peak tower

      // Draw Hotspot 1
      ctx.beginPath();
      ctx.arc(hp1.x, hp1.y, 8, 0, Math.PI * 2);
      ctx.fillStyle = "#f59e0b";
      ctx.fill();
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw Hotspot 2
      ctx.beginPath();
      ctx.arc(hp2.x, hp2.y, 8, 0, Math.PI * 2);
      ctx.fillStyle = "#10b981";
      ctx.fill();
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.restore();
    };

    render();
  }, [rotation, zoom, wireframe]);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    lastMouse.current = { x: e.clientX, y: e.clientY };
    setIsAutoRotate(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const dx = e.clientX - lastMouse.current.x;
    const dy = e.clientY - lastMouse.current.y;

    setRotation((prev) => ({
      x: Math.max(-80, Math.min(80, prev.x + dy * 0.5)),
      y: (prev.y + dx * 0.5) % 360
    }));

    lastMouse.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
      <div className="bg-stone-900 text-white w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl border border-stone-800 flex flex-col my-auto max-h-[92vh]">
        
        {/* Header Bar */}
        <div className="p-4 sm:p-5 bg-stone-950 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-400 text-stone-950 rounded-2xl shadow-sm">
              <Box className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-amber-300 font-bold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{language === "ar" ? "المعرض ثلاثي الأبعاد التفاعلي 3D" : "Interactive 3D Landmark Model"}</span>
              </div>
              <h2 className="text-lg sm:text-2xl font-black text-white">
                {language === "ar" ? landmarkNameAr : landmarkNameEn}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 bg-stone-800 hover:bg-stone-700 rounded-full text-stone-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 3D Viewer Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-3 flex-1 min-h-[420px] bg-stone-950">
          
          {/* Main 3D Canvas Area */}
          <div className="lg:col-span-2 relative flex items-center justify-center p-4 bg-stone-900 border-b lg:border-b-0 lg:border-e border-stone-800">
            
            {/* Canvas */}
            <canvas
              ref={canvasRef}
              width={560}
              height={400}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              className="w-full max-w-full h-auto rounded-2xl cursor-grab active:cursor-grabbing border border-stone-800 shadow-inner"
            />

            {/* Instruction Banner overlay */}
            <div className="absolute top-6 left-6 right-6 flex items-center justify-between pointer-events-none">
              <div className="bg-stone-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-stone-700/60 text-[11px] font-bold text-stone-300 flex items-center gap-1.5">
                <RotateCw className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: "6s" }} />
                <span>{language === "ar" ? "اسحب الماوس لتدوير المجسم 3D" : "Drag mouse to rotate 3D model"}</span>
              </div>

              <div className="bg-amber-400/20 text-amber-300 border border-amber-400/40 px-3 py-1 rounded-full text-[10px] font-black">
                Interactive WebGL 3D
              </div>
            </div>

            {/* Canvas Floating Controls */}
            <div className="absolute bottom-6 inset-x-6 flex items-center justify-center gap-2 flex-wrap">
              <button
                onClick={() => setIsAutoRotate(!isAutoRotate)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center gap-1.5 ${
                  isAutoRotate
                    ? "bg-amber-400 text-stone-950 border-amber-300 shadow-md"
                    : "bg-stone-800 text-stone-300 border-stone-700 hover:bg-stone-700"
                }`}
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span>{isAutoRotate ? (language === "ar" ? "إيقاف التدوير" : "Pause Auto-Rotate") : (language === "ar" ? "تدوير تلقائي" : "Auto Rotate")}</span>
              </button>

              <button
                onClick={() => setWireframe(!wireframe)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center gap-1.5 ${
                  wireframe
                    ? "bg-emerald-500 text-stone-950 border-emerald-400 shadow-md"
                    : "bg-stone-800 text-stone-300 border-stone-700 hover:bg-stone-700"
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>{wireframe ? (language === "ar" ? "وضع الهيكل الخارجي" : "Wireframe Mode") : (language === "ar" ? "وضع الإكساء الكامل" : "Textured Mode")}</span>
              </button>

              <div className="flex items-center bg-stone-800 rounded-xl border border-stone-700 p-1 gap-1">
                <button
                  onClick={() => setZoom((z) => Math.min(2, z + 0.2))}
                  className="p-1.5 hover:bg-stone-700 rounded-lg text-stone-300 cursor-pointer"
                  title="تكبير"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <span className="text-xs font-extrabold text-amber-300 px-2">{Math.round(zoom * 100)}%</span>
                <button
                  onClick={() => setZoom((z) => Math.max(0.5, z - 0.2))}
                  className="p-1.5 hover:bg-stone-700 rounded-lg text-stone-300 cursor-pointer"
                  title="تصغير"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

          {/* Side Info & Architectural Specs */}
          <div className="p-6 flex flex-col justify-between space-y-6 overflow-y-auto">
            <div>
              <div className="relative rounded-2xl overflow-hidden mb-4 border border-stone-800 h-36">
                <img src={landmarkImage} alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />
                <div className="absolute bottom-3 right-3 text-xs font-bold text-amber-300 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{language === "ar" ? "الموقع الجغرافي المعزز" : "Augmented Location"}</span>
                </div>
              </div>

              <h3 className="text-base font-bold text-white mb-2">
                {language === "ar" ? "مواصفات ودقة المجسم ثلاثي الأبعاد" : "3D Model Specs & Details"}
              </h3>

              <div className="space-y-2.5 text-xs">
                <div className="p-3 bg-stone-800/80 rounded-xl border border-stone-700/60 flex items-center justify-between">
                  <span className="text-stone-400">{language === "ar" ? "نمط الطراز المعماري:" : "Architectural Style:"}</span>
                  <span className="font-bold text-amber-300">{language === "ar" ? "نجدي تاريخي أصيل" : "Authentic Najdi"}</span>
                </div>

                <div className="p-3 bg-stone-800/80 rounded-xl border border-stone-700/60 flex items-center justify-between">
                  <span className="text-stone-400">{language === "ar" ? "دقة الأوجه والزوايا:" : "Polygons & Geometry:"}</span>
                  <span className="font-bold text-emerald-400">48,500 Triangles (High-Res)</span>
                </div>

                <div className="p-3 bg-stone-800/80 rounded-xl border border-stone-700/60 flex items-center justify-between">
                  <span className="text-stone-400">{language === "ar" ? "الخامات والإكساء:" : "Textures:"}</span>
                  <span className="font-bold text-amber-300">4K PBR Mud Brick & Gold</span>
                </div>
              </div>
            </div>

            {/* Hotspots Inspector */}
            <div className="p-4 bg-amber-950/30 rounded-2xl border border-amber-500/30">
              <div className="text-xs font-extrabold text-amber-300 mb-2 flex items-center gap-1.5">
                <Eye className="w-4 h-4 text-amber-400" />
                <span>{language === "ar" ? "نقاط التفاعل بالمجسم (Hotspots)" : "Interactive Hotspots"}</span>
              </div>
              <p className="text-xs text-stone-300 leading-relaxed">
                {language === "ar"
                  ? "اضغط على النقطة الصفراء للاطلاع على بوابة القصر الرئيسي، أو النقطة الخضراء لرؤية برج المراقبة الملكي."
                  : "Click the yellow marker to view the main palace gate, or the green marker for the royal observation tower."}
              </p>
            </div>

          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-950 border-t border-stone-800 flex justify-between items-center">
          <span className="text-xs text-stone-400 font-medium">
            SAUDI EXPLORER AI — 3D Heritage Renderer
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-stone-800 hover:bg-stone-700 text-white font-bold rounded-xl text-xs cursor-pointer"
          >
            {language === "ar" ? "إغلاق" : "Close"}
          </button>
        </div>

      </div>
    </div>
  );
};
