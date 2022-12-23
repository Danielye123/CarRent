import React from 'react';
import Image from 'next/image';
import images from '../assets';

const footerLinks = [
  {
    title: 'About',
    sublinks: [
      {
        name: 'How it works',
        link: '/how-it-works',
      },
      {
        name: 'Featured',
        link: '/featured',
      },
      {
        name: 'Partnership',
        link: '/partnership',
      },
      {
        name: 'Buisness Relation',
        link: '/buisness-relation',
      },
    ],
  },
  {
    title: 'Social',
    sublinks: [
      {
        name: 'Discord',
        link: '/discord',
      },
      {
        name: 'Instagram',
        link: '/instagram',
      },
      {
        name: 'Twitter',
        link: '/twitter',
      },
      {
        name: 'Facebook',
        link: '/facebook',
      },
    ],
  },
  {
    title: 'Community',
    sublinks: [
      {
        name: 'Events',
        link: '/events',
      },
      {
        name: 'Blogs',
        link: '/blog',
      },
      {
        name: 'Podcast',
        link: '/podcast',
      },
      {
        name: 'Invite a friend',
        link: '/invite a friend',
      },
    ],
  },
];

const Footer = () => (
  <footer className="w-full flex flex-col  p-6 md:p-16 sm:gap-8 gap-4 bg-white">
    {/* links */}
    <div className="flex justify-between flex-wrap gap-4">
      <div>
        <Image
          src={images.Logo}
          alt="Logo"
          width={148}
          height={44}
          layout="fill"
        /><br />

        <h1 className="max w-35 font-jakarta font-medium text-[16px] leading-[32px] text-[#90A3BF]">Our vision is to provide convenience <br /> and help increase your sales business.</h1>
      </div>
      <div className="flex flex-row flex-wrap gap-28">
        {footerLinks.map((links, index) => (
          <div className="flex flex-col gap-6" key={index}>

            <h1 className="font-jakarta font-semibold text-[20px] leading-[24px] text-[#131313]">{links.title}</h1>
            <div className="flex flex-col gap-4 font-jakarta font-medium text-[16px] leading-[19.2px] text-[#90A3BF]">
              {links.sublinks.map((sublink) => (
                <a key={sublink.name} href={sublink.link} className="cursor-pointer">{sublink.name}</a>
              ))}
            </div>
          </div>
        ))}

      </div>
    </div>

    <hr className="my-8 h-px bg-gray-200 border-1 dark:bg-gray-700" />

    {/* copyright */}
    <div className="flex justify-end gap-4">
      <div className="w-full flex justify-between flex-wrap">
        <p className="font-jakarta font-semibold text-[16px] leading-[32px] text-[#131313]">©2022 MORENT. All rights reserved</p>

        <div className="flex flex-row flex-wrap  md:gap-8 gap-4">
          <p
            className="font-semibold leading-[32px] text-[16px] md:text-[#131313] text-red-700"
          >Privacy & Policy
          </p>
          <p
            className="font-semibold leading-[32px] text-[16px] text-[#131313]"
          >Terms & Condition
          </p>
        </div>
      </div>
    </div>

  </footer>
);

export default Footer;
