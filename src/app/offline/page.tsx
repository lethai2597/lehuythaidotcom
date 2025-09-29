'use client';

export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-200 flex items-center justify-center">
      <div className="text-center">
        <div className="mb-8">
          <svg 
            className="w-24 h-24 mx-auto text-zinc-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" 
            />
          </svg>
        </div>
        <h1 className="text-4xl font-bold mb-4">Không có kết nối mạng</h1>
        <p className="text-xl text-zinc-400 mb-8">
          Vui lòng kiểm tra kết nối internet của bạn và thử lại.
        </p>
        <button 
          onClick={() => window.location.reload()} 
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors duration-200"
        >
          Thử lại
        </button>
      </div>
    </div>
  );
}
