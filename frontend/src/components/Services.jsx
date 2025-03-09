import React from 'react'

const Services = () => {
    const services = [
        {
    id: 1,
    url: "https://t3.ftcdn.net/jpg/04/42/62/12/360_F_442621279_PYhie13pVGcSSYTAm1eqlC3e7Lcy0oNV.jpg",
    title: "Birthday Planning",
  },
  {
    id: 2,
    url: "https://miro.medium.com/v2/resize:fit:1400/1*CxjWZqG_HlEeC2RjPGUjbw.jpeg",
    title: "Anniversary Planning",
  },
  {
    id: 3,
    url: "https://www.michigan.org/sites/default/files/styles/image_main_content_desktop/public/legacy_drupal_7_images/camping-hero.jpeg?itok=rjnLWQzf",
    title: "Camping Trip Planning",
  },
  {
    id: 4,
    url: "https://i0.wp.com/nonscreenactivitiesforkids.com/wp-content/uploads/2022/09/generic.png?fit=1000%2C630&ssl=1",
    title: "Game Night Planning",
  },
  {
    id: 5,
    url: "https://www.propertyfinder.ae/blog/wp-content/uploads/2023/02/2-29-800x533.png",
    title: " Iftaar Party Planning",
  },
  {
    id: 6,
    url: "https://static.showit.co/800/z2y2Jne2QUix7zkQJKqvvw/168010/nm5_4284.jpg",
    title: "Wedding Planning",
  },
  {
    id: 7,
    url: "https://allaboutrosalilla.com/wp-content/uploads/2017/09/carrie-baby-shower-9.jpg",
    title: "Baby Shower Planning",
  },
  {
    id: 8,
    url: "https://thcenter.org/wp-content/uploads/2019/03/reunion-venue-planning-tips.jpg",
    title: "Reunion Party Planning",
  },
  {
    id: 9,
    url: "https://media.istockphoto.com/id/1446049165/photo/businesswoman-taking-a-speech-at-the-corporate-lunch.jpg?s=612x612&w=0&k=20&c=dpG-d6STmmTia3pU6pl3ovQNUqqMTUDG2na_5lou2W8=",
    title: "Formal Meeting Arrangement Planning",
  },
];
  return (
    <>
      <div className="services container">
        <h2>OUR SERVICES</h2>
        <div className="banner">
          {services.map((element) => {
            return (
              <div className="item" key={element.id}>
                <h3>{element.title}</h3>
                <img src={element.url} alt={element.title} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Services;