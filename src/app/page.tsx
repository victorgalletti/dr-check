import Sidebar from '@/components/sidebar/sidebar';

export default function Dashboard() {
    return (
        <div className="h-screen flex flex-col">
            <div className="flex flex-1">
                <Sidebar />
                <section>

                </section>
                <main className="flex-1 p-6 bg-stone-300">

                </main>
            </div>
        </div>
    )
}
