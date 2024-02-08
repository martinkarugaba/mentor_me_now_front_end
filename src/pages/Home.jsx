import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import AlertStatus from '../components/AlertStatus';
import SampleArrow from '../components/ux/SampleArrow';
import testImage from '../assets/photo-Marie-Curie.png';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import MentorCard from '../components/MentorCard';
import getRandomColor from '../utils/getRandomColor';
import { fetchMentorsList } from '../redux/slices/mentors/mentorsListSlice';

/**
 * Home component. Displays a list of mentors fetched from the API.
 * @returns {JSX.Element} The rendered Home component.
 */
const Home = () => {
  const dispatch = useDispatch();
  const { mentors, status, error } = useSelector((state) => state.mentorsList);

  useEffect(() => {
    dispatch(fetchMentorsList());
  }, [dispatch]);

  /**
   * Settings for the Slider component.
   * @type {Object}
   */
  const settings = {
    lazyLoad: true,
    className: 'center',
    infinite: false,
    slidesToShow: 3,
    swipeToSlide: true,
    nextArrow: <SampleArrow ariaLabel="Next" />,
    prevArrow: <SampleArrow ariaLabel="Previous" />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 580,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className=" h-full w-full lg:py-8 border-green-500 flex flex-col justify-start items-center">
      <div className="text-center">
        <h1 className="capitalize text-primary-black text-4xl font-bold lg:leading-[3rem]">
          <span>Find your perfect mentor</span>
          {' '}
          <br />
          <span className="text-sm font-normal">Unlock your potential</span>
        </h1>
        <div className="w-1/6 mx-auto mt-8 border-0 border-t-[2px] border-t-primary-gray/50 border-dotted">
          {' '}
        </div>
      </div>
      {status === 'loading' && (
        <AlertStatus
          className="h-[420px] flex justify-center items-center animate-bounce text-lg uppercase text-primary-orange"
          alertMessage="Loading..."
        />
      )}
      {status === 'failed' && (
        <div className="h-[420px] flex flex-col justify-center items-center text-primary-red">
          <p>
            Error when fetching information.
            <br />
            Causes:
          </p>
          <AlertStatus className="text-lg" alertMessage={error} />
        </div>
      )}
      {status === 'succeeded' && (
        <div className="mt-20 w-full border-orange-500">
          {mentors && mentors.length > 0 ? (
            <>
              {/* eslint-disable-next-line react/jsx-props-no-spreading */}
              <Slider {...settings}>
                {mentors?.map((mentor) => (
                  <Link to={`/mentors/${mentor.id}`} key={mentor.id}>
                    <MentorCard
                      name={mentor.name}
                      image={testImage}
                      about={mentor.about}
                      backgroundColor={getRandomColor()}
                    />
                  </Link>
                ))}
              </Slider>
            </>
          ) : (
            <AlertStatus
              className="h-[420px] flex justify-center items-center text-lg uppercase text-primary-gray"
              alertMessage="No Mentor found"
            />
          )}
        </div>
      )}
    </section>
  );
};

export default Home;
