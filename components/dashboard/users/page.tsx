'use client';
import ProfilePic from '@/assets/images/ahmed.png';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import Image from 'next/image';

export function UsersDetialsPage({ id }: { id: string | number }) {
  const userProfile = {
    userInfo: [
      { holder: 'name', value: 'Chidi Okonkwo' },
      { holder: 'email', value: 'chidi@panterrium.com' },
      { holder: 'role', value: 'Finance Admin' },
      { holder: 'status', value: 'active' },
      { holder: 'last login', value: '2024-01-25T10:15:00' },
      { holder: 'department', value: 'Finance' },
    ],
    profileImg: ProfilePic,
    is2faEnabled: true,
  };
  return (
    <div>
      <div className="flex gap-4 flex-col  border p-2  ">
        <div className=" w-full mx-auto">
          <div className=" overflow-hidden w-30 h-30 rounded-full ">
            {userProfile.profileImg ? (
              <Image
                src={userProfile.profileImg}
                alt=""
                width={100}
                height={100}
                className="object-center w-full"
              />
            ) : (
              <div className="bg-black flex items-center justify-center uppercase text-4xl w-full h-full text-white">
                AF
              </div>
            )}
          </div>
        </div>
        <div className=" flex flex-col space-y-2">
          {userProfile.userInfo.map((user, i) => (
            <div className="flex justify-between items-center" key={i}>
              <span className="text-gray-500 capitalize">{user.holder}:</span>

              {user.holder === 'status' ? (
                <span
                  className={`text-xs px-2 py-0.5 border h-fit ${
                    user.value === 'active'
                      ? 'text-green-600 bg-green-50 border-green-500'
                      : 'text-gray-600 bg-gray-50 border-gray-500'
                  }`}
                >
                  {user.value}
                </span>
              ) : (
                <span className="font-bold">{user.value}</span>
              )}
            </div>
          ))}

          <div className="flex gap-2  justify-between item-center">
            <span>2FA enabled:</span>
            <span>
              <Switch checked={userProfile.is2faEnabled} />
            </span>
          </div>
        </div>
      </div>
      <div className=" absolute bottom-4 left-1/2 -translate-x-1/2">
        <Button variant={'destructive'}>Delete User</Button>
      </div>
    </div>
  );
}
