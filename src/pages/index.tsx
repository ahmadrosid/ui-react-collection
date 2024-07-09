export default function Home() {
    const collections = [
        {
            label: 'Filter Tag UI',
            path: '/filter-tag',
            img: '/images/select-animation.png',
        },
        {
            label: 'Chat UI',
            path: '/chat-ui',
            img: '/images/chatui.png',
        },
        {
            label: 'Login Page',
            path: '/login',
            img: '/images/login.png',
        }
    ];
    return (
        <div className="max-w-6xl mx-auto p-8 relative">
            <div className="text-center pt-2">
                <h3 className="text-white text-3xl font-bold mb-6">React UI Collections</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {collections.map((collection, index) => (
                    <div key={index} className="bg-gray-800 rounded-2xl px-4 pt-4 border-2 border-gray-700 shadow-md">
                        <h3 className="text-white text-xl font-semibold mb-2">{collection.label}</h3>
                        <a href={collection.path}>
                            <img src={collection.img} alt={collection.label} className="w-full rounded-lg" />
                        </a>
                        <div className="flex justify-end pt-4 pb-2">
                            <a href={collection.path} className="text-orange-500 hover:underline text-sm">View</a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}