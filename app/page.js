import Cats from '@/components/Cats';
export default function Home() {
  return (
    <div className="bg-orange-900 p-20 text-4xl text-white text-center">
      Honka
      <div className="flex justify-between">
        <button className="p-4 bg-orange-400 text-white rounded-lg">
          Login
        </button>
        <button className="p-4 bg-slate-500 text-white rounded-lg">
          Register
        </button>
      </div>
    </div>
  );
}
