import PhoneMock from '@/components/PhoneMock';
import Calculator from '@/components/Calculator';

export default function Home() {
  return (
    <main className="flex flex-col items-stretch w-full min-h-screen sm:items-center sm:justify-center">
      <div
        className="relative flex items-center h-full min-h-screen justify-center sm:before:-z-10 sm:before:absolute sm:before:content-[''] 
        sm:before:w-[145%] sm:before:rounded-full sm:before:aspect-square sm:before:bg-pallette-green-dark"
      >
        <PhoneMock>
          <Calculator />
        </PhoneMock>
      </div>
    </main>
  );
}
