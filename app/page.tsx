import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h1>Sambung Lagu</h1>
        <div id="history" className="flex flex-col-reverse">
          <div id="album21092" className="flex flex-row p-3 outline rounded-xl bg-white/30">
            <div className="album-cover rounded-md bg-blue-100 size-[72px]"></div>
            <div className="song-description ml-3">
              <div className="flex flex-row ">
                <h3>Time for the moon night</h3>
                <div className="ml-2">2018</div>
              </div>
              <div>
                GFRIEND
              </div>
            </div>
          </div>
          <div id="album21094" className="flex flex-row p-3 outline rounded-xl bg-white/30 blur-[2px] scale-90">
            <div className="album-cover rounded-md bg-blue-100 size-[72px]"></div>
            <div className="song-description ml-3">
              <div className="flex flex-row ">
                <h3>Time for the moon night</h3>
                <div className="ml-2">2018</div>
              </div>
              <div>
                GFRIEND
              </div>
            </div>
          </div>
        </div>
        <form action="post">
          <div className="sm:col-span-4">
            <label htmlFor="judulLagu" className="block text-center">Judul lagu</label>
            <input name="judulLagu" type="text" className="block mt-3 min-w-0 grow bg-stone-900 outline rounded-full focus:outline-blue-300 sm:text-sm/6 py-1.5 px-3 text-center" placeholder="Ketik judul untuk mulai" />
          </div>
          <div className="sm:col-span-4 mt-6">
            <label htmlFor="penyanyi" className="block text-center">Penyanyi</label>
            <input name="penyayi" type="text" className="block mt-3 min-w-0 grow bg-stone-900 outline rounded-full focus:outline-blue-300 sm:text-sm/6 py-1.5 px-3 text-center" placeholder="Ketik nama penyanyi" />
          </div>
          <div className="mt-6 flex items-center justify-center gap-x-6">
            <button type="submit" className="rounded-full bg-indigo-500 px-6 py-2 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Cari</button>
          </div>
        </form>
        <div>
          <div>
            Manakah lagu yang kamu maksud?
          </div>
          <div id="history" className="flex flex-col gap-y-3">
            <div id="album21092" className="flex flex-row p-3 outline rounded-xl bg-white/30">
              <div className="album-cover rounded-md bg-blue-100 size-[72px]"></div>
              <div className="song-description ml-3">
                <div className="flex flex-row ">
                  <h3>Time for the moon night</h3>
                  <div className="ml-2">2018</div>
                </div>
                <div>
                  GFRIEND
                </div>
              </div>
            </div>
            <div id="album21092" className="flex flex-row p-3 outline rounded-xl bg-white/30">
              <div className="album-cover rounded-md bg-blue-100 size-[72px]"></div>
              <div className="song-description ml-3">
                <div className="flex flex-row ">
                  <h3>Time for the moon night</h3>
                  <div className="ml-2">2018</div>
                </div>
                <div>
                  GFRIEND
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
