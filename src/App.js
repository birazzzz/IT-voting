import React, { useEffect, useRef, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import * as pdfjsLib from 'pdfjs-dist/build/pdf';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';
import HTMLFlipBook from 'react-pageflip';
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';

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
  }
  .flip-book .page-wrapper .page {
    margin: 0 !important;
    padding: 0 !important;
    transform-style: preserve-3d;
    transform-origin: left center;
    transition: transform 0.6s cubic-bezier(0.645, 0.045, 0.355, 1);
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
  }
  .stf__wrapper {
    margin: 0 !important;
    padding: 0 !important;
    gap: 0 !important;
  }
  .stf__item {
    margin: 0 !important;
    padding: 0 !important;
  }
  .stf__wrapper {
    padding: 0 !important;
  }
  .stf__item {
    padding: 0 !important;
  }
  .stf__page {
    padding: 0 !important;
    margin: 0 !important;
  }
  .stf__page-content {
    padding: 0 !important;
    margin: 0 !important;
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
  height: calc(100vh - 60px);
  position: relative;
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
  width: 850px;
  max-width: 90vw;
  overflow: hidden;
  margin: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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
  position: fixed;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
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
  z-index: 1000;
  @media (max-width: 600px) {
    font-size: 12px;
    padding: 6px 16px;
  }
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

function Dashboard() {
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [analyticsData, setAnalyticsData] = useState({});
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPDF, setSelectedPDF] = useState('all');

  useEffect(() => {
    const data = {};
    PDF_FILES.forEach(pdf => {
      const storedAnalytics = localStorage.getItem(`pdf_analytics_${pdf.id}`);
      if (storedAnalytics) {
        data[pdf.id] = JSON.parse(storedAnalytics);
      }
    });
    setAnalyticsData(data);
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const getPageRange = (page) => {
    const start = page * 2 - 1;
    const end = page * 2;
    return `${start}-${end}`;
  };

  const getTotalViews = () => {
    return Object.values(analyticsData).reduce((sum, data) => sum + (data.viewCount || 0), 0);
  };

  const getTotalTime = () => {
    return Object.values(analyticsData).reduce((sum, data) => {
      const pageTimes = data.pageTimes || {};
      return sum + Object.values(pageTimes).reduce((pageSum, time) => pageSum + time, 0);
    }, 0);
  };

  const getMostViewedPDF = () => {
    return PDF_FILES.reduce((max, pdf) => {
      const data = analyticsData[pdf.id] || { viewCount: 0 };
      return (data.viewCount || 0) > (max.viewCount || 0) ? pdf : max;
    }, { name: 'None', viewCount: 0 });
  };

  const renderOverview = () => (
    <>
      <AnalyticsGrid>
        <StatCard>
          <StatValue>{getTotalViews()}</StatValue>
          <StatLabel>Total Views</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{formatTime(getTotalTime())}</StatValue>
          <StatLabel>Total Time Spent</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{getMostViewedPDF().name}</StatValue>
          <StatLabel>Most Viewed PDF</StatLabel>
        </StatCard>
      </AnalyticsGrid>
      <TimeChart>
        <StatLabel style={{ marginBottom: '16px' }}>Time Spent per PDF</StatLabel>
        {PDF_FILES.map(pdf => {
          const data = analyticsData[pdf.id] || { pageTimes: {} };
          const totalTime = Object.values(data.pageTimes || {}).reduce((sum, time) => sum + time, 0);
          const maxTime = Math.max(...Object.values(analyticsData).map(d => 
            Object.values(d.pageTimes || {}).reduce((sum, time) => sum + time, 0)
          ));
          const percentage = maxTime ? (totalTime / maxTime) * 100 : 0;
          
          return (
            <div key={pdf.id} style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <StatLabel>{pdf.name}</StatLabel>
                <StatLabel>{formatTime(totalTime)}</StatLabel>
              </div>
              <ChartBar style={{ width: `${percentage}%` }} />
            </div>
          );
        })}
      </TimeChart>
    </>
  );

  const renderDetailed = () => {
    const pdfs = selectedPDF === 'all' 
      ? PDF_FILES 
      : PDF_FILES.filter(pdf => pdf.id === parseInt(selectedPDF));

    return pdfs.map(pdf => {
      const data = analyticsData[pdf.id] || { pageTimes: {}, viewCount: 0, lastOpened: null };
      return (
        <div key={pdf.id} style={{ marginBottom: '32px' }}>
          <StatLabel style={{ fontSize: '18px', fontWeight: '600', color: '#222', marginBottom: '16px' }}>
            {pdf.name}
          </StatLabel>
          <AnalyticsGrid>
            <StatCard>
              <StatValue>{data.viewCount || 0}</StatValue>
              <StatLabel>Total Views</StatLabel>
            </StatCard>
            <StatCard>
              <StatValue>{formatDate(data.lastOpened)}</StatValue>
              <StatLabel>Last Opened</StatLabel>
            </StatCard>
          </AnalyticsGrid>
          <TimeChart>
            <StatLabel style={{ marginBottom: '16px' }}>Time Spent per Spread</StatLabel>
            {Object.entries(data.pageTimes || {})
              .sort(([a], [b]) => parseInt(a) - parseInt(b))
              .map(([page, time]) => {
                const maxTime = Math.max(...Object.values(data.pageTimes || {}));
                const percentage = maxTime ? (time / maxTime) * 100 : 0;
                
                return (
                  <div key={page} style={{ marginBottom: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <StatLabel>Pages {getPageRange(parseInt(page))}</StatLabel>
                      <StatLabel>{formatTime(time)}</StatLabel>
                    </div>
                    <ChartBar style={{ width: `${percentage}%` }} />
                  </div>
                );
              })}
          </TimeChart>
        </div>
      );
    });
  };

  return (
    <AppContainer>
      <AnalyticsButton onClick={() => setShowAnalytics(true)}>
        <span className="material-symbols-outlined">analytics</span>
        Analytics
      </AnalyticsButton>
      {showAnalytics && (
        <>
          <ModalOverlay onClick={() => setShowAnalytics(false)} />
          <AnalyticsModal>
            <AnalyticsTitle>
              <span className="material-symbols-outlined">insights</span>
              PDF Analytics Dashboard
            </AnalyticsTitle>
            
            <TabsContainer>
              <Tab 
                active={activeTab === 'overview'} 
                onClick={() => setActiveTab('overview')}
              >
                Overview
              </Tab>
              <Tab 
                active={activeTab === 'detailed'} 
                onClick={() => setActiveTab('detailed')}
              >
                Detailed View
              </Tab>
            </TabsContainer>

            {activeTab === 'detailed' && (
              <PDFSelector 
                value={selectedPDF} 
                onChange={(e) => setSelectedPDF(e.target.value)}
              >
                <option value="all">All PDFs</option>
                {PDF_FILES.map(pdf => (
                  <option key={pdf.id} value={pdf.id}>{pdf.name}</option>
                ))}
              </PDFSelector>
            )}

            {activeTab === 'overview' ? renderOverview() : renderDetailed()}
          </AnalyticsModal>
        </>
      )}
      <DashboardContainer>
        {PDF_FILES.map((pdf) => (
          <Link to={`/viewer/${pdf.id}`} key={pdf.id} style={{ textDecoration: 'none' }}>
            <PDFCard>
              <PDFIcon>
                <span className="material-symbols-outlined">description</span>
              </PDFIcon>
              <PDFTitle>{pdf.name}</PDFTitle>
            </PDFCard>
          </Link>
        ))}
      </DashboardContainer>
    </AppContainer>
  );
}

function PDFViewer() {
  const { id } = useParams();
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

  const selectedPDF = PDF_FILES.find(pdf => pdf.id === parseInt(id));

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

    const loadPdf = async () => {
      const loadingTask = pdfjsLib.getDocument(selectedPDF.path);
      const pdf = await loadingTask.promise;
      setNumPages(pdf.numPages);
      const images = [];
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 1.5 });
        const canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const context = canvas.getContext('2d');
        await page.render({ canvasContext: context, viewport }).promise;
        images.push(canvas.toDataURL());
      }
      setPageImages(images);
    };
    loadPdf();

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
      flipBook.current.pageFlip().flipPrev();
    }
  };

  const handleNext = () => {
    if (flipBook.current) {
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

    // Play sound
    if (audioContextRef.current && audioBufferRef.current && !audioError) {
      const source = audioContextRef.current.createBufferSource();
      source.buffer = audioBufferRef.current;
      source.connect(audioContextRef.current.destination);
      source.start(0);
    }
  };

  const isPrevDisabled = currentPage === 1;
  const isNextDisabled = currentPage + 1 >= numPages;

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
              {pageImages.map((src, idx) => (
                <div 
                  key={idx} 
                  style={{ 
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
                  }}
                >
                  <img 
                    src={src} 
                    alt={`Page ${idx + 1}`} 
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
              ))}
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
      <PageNumberPill>
        {currentPage} - {Math.min(currentPage + 1, numPages)} of {numPages}
      </PageNumberPill>
      {audioError && (
        <div style={{ color: 'red', marginBottom: 16 }}>Audio could not be played or is not supported.</div>
      )}
    </AppContainer>
  );
}

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/viewer/:id" element={<PDFViewer />} />
        </Routes>
      </Router>
    </>
  );
}

export default App; 