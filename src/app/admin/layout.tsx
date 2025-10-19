import { requireAdmin } from '@/lib/auth';
import Link from 'next/link';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/admin" className="text-xl font-bold text-gray-900">
                Admin Panel
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/admin/slider"
                className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Slider Yönetimi
              </Link>
              <Link
                href="/"
                className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Ana Sayfa
              </Link>
            </div>
          </div>
        </div>
      </nav>
      
      <main className="max-w-[1800px] mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}