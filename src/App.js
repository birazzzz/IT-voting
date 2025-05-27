import React, { useEffect, useRef, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import * as pdfjsLib from 'pdfjs-dist/build/pdf';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';
import HTMLFlipBook from 'react-pageflip';
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate, useLocation, Navigate } from 'react-router-dom';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Manrope', sans-serif;
    background: #edeae7;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
  .flip-book, .flip-book .page {
    background: transparent !important;
  }
  .flip-book .page {
    margin: 0 !important;
    padding: 0 !important;
    border: none !important;
    box-shadow: none !important;
  }
  .flip-book .page-wrapper {
    padding: 0 !important;
    margin: 0 !important;
    perspective: 2000px;
    transform-style: preserve-3d;
    overflow: visible !important;
  }
  .flip-book .page-wrapper .page {
    margin: 0 !important;
    padding: 0 !important;
    transform-style: preserve-3d;
    transform-origin: left center;
    transition: transform 0.6s cubic-bezier(0.645, 0.045, 0.355, 1);
    overflow: visible !important;
  }
  .flip-book .page-wrapper.flipping .page {
    transform: rotateY(-180deg);
  }
  .flip-book .page-wrapper.flipping .page::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: linear-gradient(to right, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0) 100%);
    transform: rotateY(180deg);
    transform-origin: left center;
    z-index: 2;
  }
  .flip-book .page-wrapper.flipping .page::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,0.2) 100%);
    z-index: 2;
  }
  .stf__block {
    margin: 0 !important;
    padding: 0 !important;
    gap: 0 !important;
    overflow: visible !important;
  }
  .stf__wrapper {
    margin: 0 !important;
    padding: 0 !important;
    gap: 0 !important;
    overflow: visible !important;
  }
  .stf__item {
    margin: 0 !important;
    padding: 0 !important;
    overflow: visible !important;
  }
  .stf__wrapper {
    padding: 0 !important;
    overflow: visible !important;
  }
  .stf__item {
    padding: 0 !important;
    overflow: visible !important;
  }
  .stf__page {
    padding: 0 !important;
    margin: 0 !important;
    overflow: visible !important;
  }
  .stf__page-content {
    padding: 0 !important;
    margin: 0 !important;
    overflow: visible !important;
  }
`;

const AppContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #edeae7;
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
`;

const DashboardContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 40px 20px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
  margin: 0 auto;
`;

const PDFCard = styled.div`
  background: white;
  border-radius: 16px;
  border: 2px solid #dedede;
  padding: 24px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;

  &:hover {
    transform: translateY(-4px);
    border-color: #81EDFF;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const PDFIcon = styled.div`
  width: 64px;
  height: 64px;
  background: #f5f5f5;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  color: #666;
`;

const PDFTitle = styled.h3`
  margin: 0;
  font-size: 1.1rem;
  color: #222;
  text-align: center;
`;

const FlipBookOuter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  width: 100vw;
  height: calc(100vh - 80px);
  position: relative;
  perspective: 2000px;
  overflow: visible;
  @media (max-width: 600px) {
    margin: 0;
  }
`;

const FlipBookCard = styled.div`
  background: transparent;
  border-radius: 32px;
  border: none;
  box-shadow: none;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1075px;
  max-width: 99vw;
  overflow: visible;
  margin: auto;
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  transform-style: preserve-3d;
  @media (max-width: 600px) {
    padding: 0;
    border-radius: 16px;
    width: 98vw;
    min-width: 0;
  }
`;

const NavButton = styled.button`
  background: ${props => props.disabled ? 'transparent' : '#ECEAE7'};
  color: ${props => props.disabled ? '#bdbdbd' : '#222'};
  border: 1px solid ${props => props.disabled ? '#bdbdbd' : '#DEDEDE'};
  border-radius: 999px;
  width: 48px;
  height: 48px;
  font-size: 1.65rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${props => props.disabled ? 'default' : 'pointer'};
  box-shadow: none;
  transition: background 0.2s, color 0.2s, border-color 0.2s;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1000;
  &:hover {
    background: ${props => props.disabled ? 'transparent' : '#81EDFF'};
    color: ${props => props.disabled ? '#bdbdbd' : '#000'};
    border-color: ${props => props.disabled ? '#bdbdbd' : '#81EDFF'};
  }
  @media (max-width: 600px) {
    width: 32px;
    height: 32px;
    font-size: 1.05rem;
  }
`;

const PrevButton = styled(NavButton)`
  left: 20px;
  @media (max-width: 600px) {
    left: 10px;
  }
`;

const NextButton = styled(NavButton)`
  right: 20px;
  @media (max-width: 600px) {
    right: 10px;
  }
`;

const PageNumberPill = styled.div`
  background: #ECEAE7;
  color: #222;
  font-size: 12px;
  font-weight: 600;
  border-radius: 999px;
  border: 1px solid #DEDEDE;
  box-shadow: none;
  padding: 10px 32px;
  display: inline-block;
  letter-spacing: 0.04em;
  @media (max-width: 600px) {
    font-size: 12px;
    padding: 6px 16px;
  }
`;

const MuteButton = styled.button`
  background: #ECEAE7;
  color: #222;
  border: 1px solid #DEDEDE;
  border-radius: 999px;
  width: 38.5px;
  height: 38.5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 0;

  &:hover {
    background: #81EDFF;
    border-color: #81EDFF;
  }

  .material-symbols-outlined {
    font-size: 20px;
  }

  @media (max-width: 600px) {
    width: 32px;
    height: 32px;
    
    .material-symbols-outlined {
      font-size: 16px;
    }
  }
`;

const ControlsContainer = styled.div`
  position: fixed;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 12px;
  z-index: 1000;
`;

const AnalyticsButton = styled.button`
  position: fixed;
  top: 20px;
  right: 20px;
  background: #ECEAE7;
  color: #222;
  border: 1px solid #DEDEDE;
  border-radius: 999px;
  padding: 8px 16px;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  z-index: 1000;

  &:hover {
    background: #81EDFF;
    border-color: #81EDFF;
  }
`;

const AnalyticsModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  border-radius: 24px;
  padding: 32px;
  width: 90%;
  max-width: 800px;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  z-index: 1001;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const AnalyticsTitle = styled.h2`
  margin: 0 0 24px 0;
  font-size: 1.75rem;
  color: #222;
  display: flex;
  align-items: center;
  gap: 12px;
  
  .material-symbols-outlined {
    font-size: 24px;
    color: #81EDFF;
  }
`;

const TabsContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
  border-bottom: 2px solid #DEDEDE;
  padding-bottom: 8px;
`;

const Tab = styled.button`
  background: ${props => props.active ? '#81EDFF' : 'transparent'};
  color: ${props => props.active ? '#000' : '#666'};
  border: none;
  border-radius: 999px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.active ? '#81EDFF' : '#f5f5f5'};
  }
`;

const AnalyticsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
`;

const StatCard = styled.div`
  background: #f8f8f8;
  border-radius: 16px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StatValue = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: #222;
`;

const StatLabel = styled.div`
  font-size: 14px;
  color: #666;
`;

const TimeChart = styled.div`
  background: #f8f8f8;
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 24px;
`;

const ChartBar = styled.div`
  height: 8px;
  background: #81EDFF;
  border-radius: 4px;
  margin: 8px 0;
  transition: width 0.3s ease;
`;

const ChartLabel = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #666;
  margin-top: 4px;
`;

const PDFSelector = styled.select`
  background: #f8f8f8;
  border: 1px solid #DEDEDE;
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 14px;
  color: #222;
  margin-bottom: 24px;
  width: 200px;
  
  &:focus {
    outline: none;
    border-color: #81EDFF;
  }
`;

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const PDF_FILES = [
  {
    id: 1,
    name: 'Flyer',
    path: '/Flyer.pdf',
    thumbnail: '/Flyer.pdf'
  },
  {
    id: 2,
    name: 'Brochure',
    path: '/brochure.pdf',
    thumbnail: '/brochure.pdf'
  }
];

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // If someone tries to access the root URL or any invalid URL
    if (location.pathname === '/' || !location.pathname.match(/^\/[1-2]$/)) {
      // Redirect to a 404 page or the first PDF
      navigate('/1', { replace: true });
    }
  }, [location.pathname, navigate]);

  return (
    <>
      <GlobalStyle />
      <Routes>
        {/* Remove the dashboard route */}
        {PDF_FILES.map((pdf) => (
          <Route
            key={pdf.id}
            path={`/${pdf.id}`}
            element={
              <PDFViewer
                id={pdf.id}
                isIsolated={true}
              />
            }
          />
        ))}
        {/* Catch all other routes and redirect to first PDF */}
        <Route path="*" element={<Navigate to="/1" replace />} />
      </Routes>
    </>
  );
}

function PDFViewer({ id, isIsolated }) {
  const navigate = useNavigate();
  const [numPages, setNumPages] = useState(0);
  const [pageImages, setPageImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const flipBook = useRef();
  const [audioError, setAudioError] = useState(false);
  const audioContextRef = useRef(null);
  const audioBufferRef = useRef(null);
  const [pageTimes, setPageTimes] = useState({});
  const [viewCount, setViewCount] = useState(0);
  const [lastOpened, setLastOpened] = useState(null);
  const pageStartTime = useRef(null);
  const [isMuted, setIsMuted] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const pageCache = useRef(new Map());

  // Prevent navigation and context menu
  useEffect(() => {
    // Disable browser back button
    window.history.pushState(null, '', window.location.href);
    window.onpopstate = function() {
      window.history.pushState(null, '', window.location.href);
    };

    // Prevent right-click and other context menus
    const preventDefault = (e) => e.preventDefault();
    document.addEventListener('contextmenu', preventDefault);
    document.addEventListener('selectstart', preventDefault);
    document.addEventListener('dragstart', preventDefault);

    // Prevent keyboard shortcuts
    const preventKeyboardShortcuts = (e) => {
      if (
        (e.ctrlKey || e.metaKey) && 
        (e.key === 'r' || e.key === 'u' || e.key === 's' || e.key === 'p')
      ) {
        e.preventDefault();
      }
    };
    document.addEventListener('keydown', preventKeyboardShortcuts);

    return () => {
      window.onpopstate = null;
      document.removeEventListener('contextmenu', preventDefault);
      document.removeEventListener('selectstart', preventDefault);
      document.removeEventListener('dragstart', preventDefault);
      document.removeEventListener('keydown', preventKeyboardShortcuts);
    };
  }, []);

  const selectedPDF = PDF_FILES.find(pdf => pdf.id === parseInt(id));

  const loadPage = async (page, pdf) => {
    try {
      const pageNum = page.pageNumber;
      if (pageCache.current.has(pageNum)) {
        return pageCache.current.get(pageNum);
      }

      const viewport = page.getViewport({ scale: 1.5 });
      const canvas = document.createElement('canvas');
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      const context = canvas.getContext('2d', { alpha: false });
      
      // Optimize rendering settings
      const renderContext = {
        canvasContext: context,
        viewport: viewport,
        intent: 'display',
        renderInteractiveForms: false,
        enableWebGL: true,
        cMapUrl: 'https://unpkg.com/pdfjs-dist@2.16.105/cmaps/',
        cMapPacked: true,
      };

      await page.render(renderContext).promise;
      const imageData = canvas.toDataURL('image/jpeg', 0.8);
      pageCache.current.set(pageNum, imageData);
      return imageData;
    } catch (error) {
      console.error(`Error loading page ${page.pageNumber}:`, error);
      return null;
    }
  };

  useEffect(() => {
    if (!selectedPDF) {
      navigate('/');
      return;
    }

    const loadPdf = async () => {
      try {
        // Configure PDF.js worker
        pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;
        
        // Set up caching
        const cacheKey = `pdf_cache_${selectedPDF.id}`;
        const cachedData = localStorage.getItem(cacheKey);
        
        if (cachedData) {
          const { numPages, images } = JSON.parse(cachedData);
          setNumPages(numPages);
          setPageImages(images);
          setLoadingProgress(100); // Set to 100% when using cached data
          return;
        }

        // Load PDF with optimized settings
        const loadingTask = pdfjsLib.getDocument({
          url: selectedPDF.path,
          cMapUrl: 'https://unpkg.com/pdfjs-dist@2.16.105/cmaps/',
          cMapPacked: true,
          standardFontDataUrl: 'https://unpkg.com/pdfjs-dist@2.16.105/standard_fonts/',
          disableFontFace: true,
          useSystemFonts: true,
        });

        const pdf = await loadingTask.promise;
        setNumPages(pdf.numPages);

        // Load pages in parallel with progress tracking
        const pagePromises = [];
        const loadedImages = new Array(pdf.numPages).fill(null);
        
        for (let i = 1; i <= pdf.numPages; i++) {
          const pagePromise = (async () => {
            const page = await pdf.getPage(i);
            const imageData = await loadPage(page, pdf);
            loadedImages[i - 1] = imageData;
            setLoadingProgress((prev) => prev + (100 / pdf.numPages));
            return imageData;
          })();
          pagePromises.push(pagePromise);
        }

        // Process pages in chunks to avoid overwhelming the browser
        const chunkSize = 4;
        for (let i = 0; i < pagePromises.length; i += chunkSize) {
          const chunk = pagePromises.slice(i, i + chunkSize);
          await Promise.all(chunk);
          setPageImages([...loadedImages]);
        }

        // Cache the results
        localStorage.setItem(cacheKey, JSON.stringify({
          numPages: pdf.numPages,
          images: loadedImages,
        }));

        // Ensure loading progress is set to 100% after all pages are loaded
        setLoadingProgress(100);

      } catch (error) {
        console.error('Error loading PDF:', error);
        setLoadingProgress(100); // Set to 100% even on error to hide loading state
      }
    };

    loadPdf();
  }, [selectedPDF, navigate]);

  useEffect(() => {
    // Load analytics data from localStorage
    const storedAnalytics = localStorage.getItem(`pdf_analytics_${id}`);
    if (storedAnalytics) {
      const { pageTimes: storedPageTimes, viewCount: storedViewCount, lastOpened: storedLastOpened } = JSON.parse(storedAnalytics);
      setPageTimes(storedPageTimes || {});
      setViewCount(storedViewCount || 0);
      setLastOpened(storedLastOpened || null);
    }

    // Increment view count
    setViewCount(prev => prev + 1);
    setLastOpened(new Date().toISOString());

    // Start timing for first page
    pageStartTime.current = Date.now();

    if (!selectedPDF) {
      navigate('/');
      return;
    }

    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      fetch('/flip2.mp3')
        .then(response => response.arrayBuffer())
        .then(arrayBuffer => audioContextRef.current.decodeAudioData(arrayBuffer))
        .then(audioBuffer => {
          audioBufferRef.current = audioBuffer;
        })
        .catch((e) => {
          setAudioError(true);
          console.error('Web Audio API error:', e);
        });
    }
  }, [selectedPDF, navigate]);

  useEffect(() => {
    // Save analytics data to localStorage whenever it changes
    const analyticsData = {
      pageTimes,
      viewCount,
      lastOpened
    };
    localStorage.setItem(`pdf_analytics_${id}`, JSON.stringify(analyticsData));
  }, [pageTimes, viewCount, lastOpened, id]);

  const handlePrev = () => {
    if (flipBook.current) {
      // Play sound if not muted
      if (!isMuted && audioContextRef.current && audioBufferRef.current && !audioError) {
        const source = audioContextRef.current.createBufferSource();
        source.buffer = audioBufferRef.current;
        source.connect(audioContextRef.current.destination);
        source.start(0);
      }
      flipBook.current.pageFlip().flipPrev();
    }
  };

  const handleNext = () => {
    if (flipBook.current) {
      // Play sound if not muted
      if (!isMuted && audioContextRef.current && audioBufferRef.current && !audioError) {
        const source = audioContextRef.current.createBufferSource();
        source.buffer = audioBufferRef.current;
        source.connect(audioContextRef.current.destination);
        source.start(0);
      }
      flipBook.current.pageFlip().flipNext();
    }
  };

  const onFlip = (e) => {
    const newPage = e.data + 1;
    
    // Record time spent on previous spread (two pages)
    if (pageStartTime.current) {
      const timeSpent = Math.floor((Date.now() - pageStartTime.current) / 1000);
      const spreadNumber = Math.ceil(currentPage / 2);
      setPageTimes(prev => ({
        ...prev,
        [spreadNumber]: (prev[spreadNumber] || 0) + timeSpent
      }));
    }

    // Start timing for new spread
    pageStartTime.current = Date.now();
    setCurrentPage(newPage);
  };

  const isPrevDisabled = currentPage === 1;
  const isNextDisabled = currentPage + 1 >= numPages;

  const renderPages = () => {
    if (pageImages.length === 0) return null;

    const pages = [];
    for (let i = 0; i < pageImages.length; i++) {
      if (i === 0) {
        // First page
        pages.push(
          <div key={i} style={{ 
            width: '100%', 
            height: '100%', 
            background: 'transparent', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            padding: 0, 
            margin: 0, 
            borderRadius: 0,
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden'
          }}>
            <img 
              src={pageImages[i]} 
              alt={`Page ${i + 1}`} 
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'contain', 
                display: 'block', 
                margin: 0, 
                padding: 0, 
                borderRadius: 0,
                boxShadow: '0 0 20px rgba(0,0,0,0.2)',
                transform: 'translateZ(0)'
              }} 
            />
          </div>
        );
      } else if (i === pageImages.length - 1) {
        // Last page
        pages.push(
          <div key={i} style={{ 
            width: '100%', 
            height: '100%', 
            background: 'transparent', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            padding: 0, 
            margin: 0, 
            borderRadius: 0,
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden'
          }}>
            <img 
              src={pageImages[i]} 
              alt={`Page ${i + 1}`} 
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'contain', 
                display: 'block', 
                margin: 0, 
                padding: 0, 
                borderRadius: 0,
                boxShadow: '0 0 20px rgba(0,0,0,0.2)',
                transform: 'translateZ(0)'
              }} 
            />
          </div>
        );
      } else {
        // Two pages at a time
        pages.push(
          <div key={i} style={{ 
            width: '100%', 
            height: '100%', 
            background: 'transparent', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            padding: 0, 
            margin: 0, 
            borderRadius: 0,
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden'
          }}>
            <img 
              src={pageImages[i]} 
              alt={`Page ${i + 1}`} 
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'contain', 
                display: 'block', 
                margin: 0, 
                padding: 0, 
                borderRadius: 0,
                boxShadow: '0 0 20px rgba(0,0,0,0.2)',
                transform: 'translateZ(0)'
              }} 
            />
          </div>
        );
      }
    }
    return pages;
  };

  return (
    <AppContainer>
      <FlipBookOuter>
        {!isPrevDisabled && (
          <PrevButton onClick={handlePrev} aria-label="Previous page">
            <span className="material-symbols-outlined" style={{ fontSize: '1.65rem', fontWeight: 400 }}>
              arrow_back
            </span>
          </PrevButton>
        )}
        <FlipBookCard>
          {pageImages.length > 0 && (
            <HTMLFlipBook
              width={750}
              height={1000}
              size="stretch"
              minWidth={394}
              maxWidth={1125}
              minHeight={500}
              maxHeight={1500}
              maxShadowOpacity={0.5}
              showCover={false}
              mobileScrollSupport={true}
              flipByClick={true}
              onFlip={onFlip}
              ref={flipBook}
              flippingTime={1000}
              usePortrait={true}
              startPage={0}
              drawShadow={true}
              useMouseEvents={true}
              clickEventForward={true}
              disableFlipByClick={false}
              showPageCorners={true}
              className="flip-book"
              startZIndex={0}
              autoSize={true}
              swipeDistance={0}
              style={{
                margin: '0 auto',
                gap: 0,
                background: 'transparent',
                boxShadow: 'none',
                padding: 0,
                '--page-gap': '0px',
                '--page-padding': '0px',
                '--page-shadow': '0 0 20px rgba(0,0,0,0.2)',
                '--page-transition': 'transform 0.6s cubic-bezier(0.645, 0.045, 0.355, 1)',
                '--page-perspective': '2000px',
                '--page-transform-style': 'preserve-3d',
                '--page-transform-origin': 'left center'
              }}
            >
              {renderPages()}
            </HTMLFlipBook>
          )}
        </FlipBookCard>
        {!isNextDisabled && (
          <NextButton onClick={handleNext} aria-label="Next page">
            <span className="material-symbols-outlined" style={{ fontSize: '1.65rem', fontWeight: 400 }}>
              arrow_forward
            </span>
          </NextButton>
        )}
      </FlipBookOuter>
      <ControlsContainer>
        <MuteButton 
          onClick={() => setIsMuted(!isMuted)} 
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          <span className="material-symbols-outlined">
            {isMuted ? 'volume_off' : 'volume_up'}
          </span>
        </MuteButton>
        <PageNumberPill>
          {currentPage} - {Math.min(currentPage + 1, numPages)} of {numPages}
        </PageNumberPill>
      </ControlsContainer>
      {loadingProgress < 100 && (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: '#ECEAE7',
          padding: '12px 24px',
          borderRadius: '999px',
          fontSize: '14px',
          color: '#222',
          zIndex: 1000,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          border: '1px solid #DEDEDE'
        }}>
          Loading: {Math.round(loadingProgress)}%
        </div>
      )}
      {audioError && (
        <div style={{ color: 'red', marginBottom: 16 }}>Audio could not be played or is not supported.</div>
      )}
    </AppContainer>
  );
}

export default App; 