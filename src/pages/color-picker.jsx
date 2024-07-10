import React, { useState, useCallback, useMemo, useRef, useEffect  } from 'react';
import { ChevronDown, Copy } from 'lucide-react';

const CustomSelect = ({ options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full" ref={selectRef}>
      <div
        className="bg-gray-800 border border-gray-700 rounded-md p-2 flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{value || 'Select an option'}</span>
        <ChevronDown className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>
      {isOpen && (
        <ul className="absolute z-10 w-full bg-gray-800 border border-gray-700 rounded-md mt-1 max-h-60 overflow-auto">
          {options.map((option, index) => (
            <li
              key={index}
              className="p-2 hover:bg-gray-800 cursor-pointer"
              onClick={() => handleSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const CustomColorPicker = () => {
  const [hue, setHue] = useState(260);
  const [saturation, setSaturation] = useState(40);
  const [lightness, setLightness] = useState(37);
  const [alpha, setAlpha] = useState(100);
  const [format, setFormat] = useState("Hex");

  const formatOptions = ["Hex", "RGB", "HSL", "RGBA", "HSLA"];

  const hslToRgb = useCallback((h, s, l) => {
    s /= 100;
    l /= 100;
    const k = n => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = n =>
      l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return [
      Math.round(255 * f(0)),
      Math.round(255 * f(8)),
      Math.round(255 * f(4))
    ];
  }, []);

  const color = useMemo(() => {
    const [r, g, b] = hslToRgb(hue, saturation, lightness);
    return { r, g, b, a: alpha / 100 };
  }, [hue, saturation, lightness, alpha, hslToRgb]);

  const rgbToHex = useCallback(({ r, g, b, a }) => {
    const hex = [r, g, b, Math.round(a * 255)]
      .map(x => x.toString(16).padStart(2, '0'))
      .join('');
    return `#${hex}`;
  }, []);

  const getFormattedColor = useCallback(() => {
    switch (format) {
      case 'Hex': return rgbToHex(color);
      case 'RGB': return `rgb(${color.r}, ${color.g}, ${color.b})`;
      case 'RGBA': return `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a.toFixed(2)})`;
      case 'HSL': return `hsl(${Math.round(hue)}, ${Math.round(saturation)}%, ${Math.round(lightness)}%)`;
      case 'HSLA': return `hsla(${Math.round(hue)}, ${Math.round(saturation)}%, ${Math.round(lightness)}%, ${(alpha / 100).toFixed(2)})`;
      default: return rgbToHex(color);
    }
  }, [color, format, rgbToHex, hue, saturation, lightness, alpha]);

  const ColorArea = ({ hue, saturation, lightness, onChange }) => {
    const handleInteraction = useCallback((e) => {
      const area = e.currentTarget;
      const rect = area.getBoundingClientRect();
      const updateValue = (clientX, clientY) => {
        const x = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
        const y = Math.max(0, Math.min(1, (clientY - rect.top) / rect.height));
        onChange(x * 100, (1 - y) * 100);
      };

      updateValue(e.clientX, e.clientY);

      const handleMove = (event) => {
        event.preventDefault();
        updateValue(event.clientX, event.clientY);
      };

      const handleEnd = () => {
        document.removeEventListener('mousemove', handleMove);
        document.removeEventListener('mouseup', handleEnd);
        document.removeEventListener('touchmove', handleMove);
        document.removeEventListener('touchend', handleEnd);
      };

      document.addEventListener('mousemove', handleMove);
      document.addEventListener('mouseup', handleEnd);
      document.addEventListener('touchmove', handleMove);
      document.addEventListener('touchend', handleEnd);
    }, [onChange]);

    return (
      <div 
        className="relative w-full h-48 rounded cursor-pointer"
        style={{ 
          background: `
            linear-gradient(to top, black, transparent),
            linear-gradient(to right, white, hsl(${hue}, 100%, 50%))
          `
        }}
        onMouseDown={handleInteraction}
        onTouchStart={handleInteraction}
      >
        <div 
          className="absolute w-4 h-4 rounded-full border-2 border-white shadow-md"
          style={{ 
            left: `${saturation}%`, 
            bottom: `${lightness}%`,
            transform: 'translate(-50%, 50%)'
          }}
        />
      </div>
    );
  };

  const Slider = React.memo(({ value, max, onChange, gradient, isAlpha }) => {
    const handleInteraction = useCallback((e) => {
      const slider = e.currentTarget;
      const rect = slider.getBoundingClientRect();
      const updateValue = (clientY) => {
        const y = clientY - rect.top;
        const newValue = Math.round(max * (1 - y / rect.height));
        onChange(Math.max(0, Math.min(max, newValue)));
      };

      updateValue(e.clientY);

      const handleMove = (event) => {
        event.preventDefault();
        updateValue(event.clientY);
      };

      const handleEnd = () => {
        document.removeEventListener('mousemove', handleMove);
        document.removeEventListener('mouseup', handleEnd);
        document.removeEventListener('touchmove', handleMove);
        document.removeEventListener('touchend', handleEnd);
      };

      document.addEventListener('mousemove', handleMove);
      document.addEventListener('mouseup', handleEnd);
      document.addEventListener('touchmove', handleMove);
      document.addEventListener('touchend', handleEnd);
    }, [onChange, max]);

    return (
      <div 
        className="relative w-6 h-48 cursor-pointer rounded overflow-hidden"
        onMouseDown={handleInteraction}
        onTouchStart={handleInteraction}
      >
        {isAlpha && (
          <div 
            className="absolute w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(45deg, #ccc 25%, transparent 25%), 
                linear-gradient(-45deg, #ccc 25%, transparent 25%), 
                linear-gradient(45deg, transparent 75%, #ccc 75%), 
                linear-gradient(-45deg, transparent 75%, #ccc 75%)
              `,
              backgroundSize: '12px 12px',
              backgroundPosition: '0 0, 0 6px, 6px -6px, -6px 0px'
            }}
          />
        )}
        <div 
          className="absolute w-full h-full"
          style={{ background: gradient }}
        />
        <div 
          className="absolute w-full h-1 bg-white"
          style={{ bottom: `${(value / max) * 100}%`, transform: 'translateY(50%)' }}
        />
      </div>
    );
  });

  const handleColorAreaChange = useCallback((s, l) => {
    setSaturation(s);
    setLightness(l);
  }, []);

  return (
    <div className="p-8">
        <div className='text-center py-4'>
            <h1 className='text-4xl'>Color Picker</h1>
        </div>
        <div className="bg-gray-900 border border-gray-800 mx-auto p-4 rounded-lg shadow-lg w-96">
          <div className="flex">
            <div className="flex-grow mr-4">
              <ColorArea
                hue={hue}
                saturation={saturation}
                lightness={lightness}
                onChange={handleColorAreaChange}
              />
            </div>
            <div className="flex space-x-2">
              <Slider
                value={hue}
                max={360}
                onChange={setHue}
                gradient="linear-gradient(to top, red, #ff0, lime, cyan, blue, #f0f, red)"
                isAlpha={false}
              />
              <Slider
                value={alpha}
                max={100}
                onChange={setAlpha}
                gradient={`linear-gradient(to top, transparent, ${rgbToHex({ ...color, a: 1 })})`}
                isAlpha={true}
              />
            </div>
        
          </div>
          <div className="flex items-center gap-2 mt-4">
            <div className="bg-gray-800 text-white p-2 rounded flex-1 flex justify-between items-center">
                <p>{getFormattedColor()}</p>
                <button className='text-gray-400'>
                    <Copy className='size-4'/>
                </button>
            </div>
            <div>
            <CustomSelect
                options={formatOptions}
                value={format}
                onChange={setFormat}
            />
            </div>
        </div>
        </div>
    </div>
  );
};

export default CustomColorPicker;