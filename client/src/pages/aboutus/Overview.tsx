import React from 'react';
import PageTitle from '../../components/PageTitle';
import OverviewAboutSection from '../../components/overview/OverviewAboutSection';
import OverviewVisionSection from '../../components/overview/OverviewVisionSection';
import OverviewHistorySection from '../../components/overview/OverviewHistorySection';
import OverviewDiscoverSection from '../../components/overview/OverviewDiscoverSection';
import { Star } from 'lucide-react';

export default function Overview(): React.JSX.Element {
	return (
		<>
			<PageTitle
				title="About Us"
				backgroundImageUrl="https://kkma.net/wp-content/uploads/2024/08/KKMA-page-title.jpg"
				breadcrumb={[
					{ label: 'Home', url: '/' },
					{ label: 'About Us' }
				]}
			/>
			<OverviewAboutSection />
			<OverviewVisionSection />
			<OverviewHistorySection />
			{/* <OverviewDiscoverSection /> */}
			<div>
      {/* Strategic Objectives Section */}
    

      {/* Information Section */}
      <section className="information-section bg-color-1">
        <div
          className="bg-layer"
          style={{
            backgroundImage:
              "url(https://kkma.net/wp-content/uploads/2024/08/KKMA_ABOUT-1.jpg)",
          }}
        ></div>
        <div className="auto-container">
          <div className="sec-title centred light">
            <h6>
              <Star fill='currentColor' size={14} />
              <span>
                cultural, professional, and personal growth within our community.
              </span>
              <Star fill='currentColor' size={14} />
            </h6>
            <h2>Empowering Community Through Diverse Initiatives</h2>
            <div className="title-shape"></div>
          </div>

          {/* Info Blocks */}
          <div className="inner-content">
            <div className="schedule-carousel">
              <div className="information-block-one">
                <div className="inner-box">
                  <span className="count">01.</span>
                  <div className="icon-box">
                    <i className="icon flaticon-diagram"></i>
                  </div>
                  <div className="text">
                    <h4>Community Engagement Initiatives</h4>
                    <p>
                      Fostering strong local ties through community-driven
                      projects and collaborative events that address pressing
                      social needs.
                    </p>
                  </div>
                </div>
              </div>
              {/* ➝ Repeat the rest of the info-blocks (02, 03, 04, etc.) */}
            </div>
          </div>
        </div>
      </section>

      {/* Award Section */}
      <section className="award-section bg-color-1">
        <figure className="image-layer">
          <img
            src="https://kkma.net/wp-content/uploads/2024/08/About-Awards.jpg"
            alt="Awesome Image"
          />
        </figure>
        <div
          className="vector-image"
          style={{
            backgroundImage:
              "url(https://kkma.net/wp-content/themes/whitehall/assets/images/icons/icon-bg-2.png)",
          }}
        ></div>
        <div className="auto-container">
          <div className="sec-title">
            <h6>
              <Star fill='currentColor' size={14} />
              <span>Our Awards</span>
            </h6>
            <h2>Our Recognitions & Appreciations</h2>
            <div className="title-shape"></div>
          </div>
          <div className="row clearfix">
            <div className="col-xl-3 col-lg-4 col-md-6 award-block">
              <div className="award-block-one">
                <div className="inner-box">
                  <figure className="award-box">
                    <div
                      className="bg-pattern"
                      style={{
                        backgroundImage:
                          "url(https://kkma.net/wp-content/themes/whitehall/assets/images/icons/icon-bg-1.png)",
                      }}
                    ></div>
                    <img
                      src="https://kkma.net/wp-content/uploads/2024/08/Demo-Awards-1.png"
                      alt="Award Image"
                    />
                  </figure>
                  <h4>
                    KKMA Demo <br />
                    Awards
                  </h4>
                  <div className="overlay-content">
                    <h4>
                      KKMA Demo <br />
                      Awards
                    </h4>
                    <p>
                      Demo awards section content for KKMA organization in
                      Kuwait.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* ➝ Repeat for other awards */}
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section
        className="feature-section sec-pad"
        style={{
          backgroundImage:
            "url(https://kkma.net/wp-content/uploads/2021/05/feature-bg-2.jpg)",
        }}
      >
        <div className="auto-container">
          <div className="sec-title centred">
            <h6>
              <Star fill='currentColor' size={14} />
              <span>
                Discover opportunities to engage, connect, and contribute
              </span>
              <Star fill='currentColor' size={14} />
            </h6>
            <h2>Explore Our Key Offerings and Programs</h2>
            <div className="title-shape"></div>
          </div>
          <div className="row clearfix">
            <div className="col-lg-3 col-md-6 col-sm-12 feature-block">
              <div className="feature-block-two">
                <div className="inner-box">
                  <figure className="image-box">
                    <img
                      src="https://kkma.net/wp-content/uploads/2024/08/Magnet-Club-About-Page.jpg"
                      alt="Awesome Image"
                    />
                  </figure>
                  <div className="lower-content">
                    <div className="icon-box">
                      <i className="fa fa-hands-helping"></i>
                    </div>
                    <h4>
                      <a href="#">Join with our Magnet Club</a>
                    </h4>
                    <div className="btn-box">
                      <a href="#">
                        Read More<i className="flaticon-right-arrow"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* ➝ Repeat for other feature blocks */}
          </div>
        </div>
      </section>
    </div>
		</>
	);
}