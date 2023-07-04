import { IAvatarStacked } from "@/interfaces/IConstants/IConstants";


const Avatar =  ({ AvatarStacked }: { AvatarStacked: IAvatarStacked[] }) => {
  return (
    <div className="flex -space-x-4">
      {AvatarStacked.map(({ img }, index) => (
        <img key={`${index + img}`}
          className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
          src={img}
          alt=""
        />
      ))}

      <a
        className="flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-gray-700 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800"
        href="#">
        +{AvatarStacked.length}
      </a>
    </div>
  );
};

export default Avatar;
