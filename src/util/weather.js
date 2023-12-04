import { TbSnowman } from 'react-icons/tb';
import {
  IoSunnyOutline,
  IoCloudyOutline,
  IoUmbrellaOutline,
} from 'react-icons/io5';
import { MdOutlineThunderstorm } from 'react-icons/md';

export const weatherList = [
  {
    weather_id: 0,
    weather_icon: <IoSunnyOutline />,
    weather_description: '맑음',
  },
  {
    weather_id: 1,
    weather_icon: <IoCloudyOutline />,
    weather_description: '흐림',
  },
  {
    weather_id: 2,
    weather_icon: <IoUmbrellaOutline />,
    weather_description: '비',
  },
  {
    weather_id: 3,
    weather_icon: <MdOutlineThunderstorm />,
    weather_description: '번개',
  },
  {
    weather_id: 4,
    weather_icon: <TbSnowman />,
    weather_description: '눈',
  },
];
