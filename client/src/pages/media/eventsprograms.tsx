import React from 'react'

type EventItem = {
  title: string
  href: string
  img: string
  dateBadge: { day: string; monthYear: string }
  dateRange: string
  location?: string
}

export default function EventsPrograms(): React.JSX.Element {
  const events: EventItem[] = [
    {
      title: 'കെ.കെ.എം.എ രക്ത ദാന ക്യാമ്പ്‌',
      href: 'https://kkma.net/event/%e0%b4%95%e0%b5%86-%e0%b4%95%e0%b5%86-%e0%b4%8e%e0%b4%82-%e0%b4%8e-%e0%b4%b0%e0%b4%95%e0%b5%8d%e0%b4%a4-%e0%b4%a6%e0%b4%be%e0%b4%a8-%e0%b4%95%e0%b5%8d%e0%b4%af%e0%b4%be%e0%b4%ae%e0%b5%8d%e0%b4%aa/',
      img: 'https://kkma.net/wp-content/uploads/2024/09/456056998_473388042139926_4659360682239931105_n-1.jpg',
      dateBadge: { day: '01', monthYear: "Jun’21" },
      dateRange: 'September 3, 2024 - September 3, 2024',
      location: 'Kuwait',
    },
    {
      title: 'വിജയം നേടിയവർക്ക് അവാർഡുകൾ',
      href: 'https://kkma.net/event/%e0%b4%9c%e0%b4%bf%e0%b4%b2%e0%b5%8d%e0%b4%b2%e0%b4%af%e0%b4%bf%e0%b5%bd-%e0%b4%a8%e0%b4%bf%e0%b4%a8%e0%b5%8d%e0%b4%a8%e0%b5%81%e0%b4%82-%e0%b4%8e%e0%b4%b8%e0%b5%8d-%e0%b4%8e%e0%b4%b8%e0%b5%8d/',
      img: 'https://kkma.net/wp-content/uploads/2024/09/457065869_480014061477324_3963912601557779540_n-2.jpg',
      dateBadge: { day: '01', monthYear: "Jun’21" },
      dateRange: 'September 25, 2024 - September 25, 2024',
      location: 'Malappuram',
    },
    {
      title: 'കെ കെ എം എ യാത്ര യായപ്പ്',
      href: 'https://kkma.net/event/%e0%b4%95%e0%b5%86-%e0%b4%95%e0%b5%86-%e0%b4%8e%e0%b4%82-%e0%b4%8e-%e0%b4%af%e0%b4%be%e0%b4%a4%e0%b5%8d%e0%b4%b0-%e0%b4%af%e0%b4%be%e0%b4%af%e0%b4%aa%e0%b5%8d%e0%b4%aa%e0%b5%8d/',
      img: 'https://kkma.net/wp-content/uploads/2024/09/452007666_455099060635491_7406906250601281188_n-1-1.jpg',
      dateBadge: { day: '01', monthYear: "Jun’21" },
      dateRange: 'September 28, 2024 - September 28, 2024',
      location: 'Kuwait',
    },
    {
      title: 'test app',
      href: 'https://kkma.net/event/test-app/',
      img: 'https://kkma.net/wp-content/uploads/2024/08/KKMA-Social-Projects-Training-Details-1.jpg',
      dateBadge: { day: '01', monthYear: "Jun’21" },
      dateRange: 'February 10 - March 3',
    },
  ]

  return (
    <div>
      <section className="page-title" style={{ backgroundImage: 'url(https://kkma.net/wp-content/uploads/2024/08/KKMA-page-title.jpg)' }}>
        <div className="auto-container">
          <div className="content-box">
            <div className="title centred">
              <h1>  Events &amp; Programs</h1>
            </div>
            <ul className="bread-crumb clearfix">
              <li><a href="/">Home</a></li>
              <li>Events &amp; Programs</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="events-grid sec-pad-2">
        <div className="auto-container">
          <div className="row clearfix">
            {events.map((event, idx) => (
              <div key={idx} className="col-lg-4 col-md-6 col-sm-12 schedule-block">
                <div className="schedule-block-one">
                  <div className="inner-box">
                    <div className="image-box">
                      <figure className="image"><img src={event.img} alt="Awesome Image" /></figure>
                      <div className="content-box">
                        <div className="post-date"><h3>{event.dateBadge.day}<span>{event.dateBadge.monthYear}</span></h3></div>
                        <div className="text">
                          <span className="category"><i className="flaticon-star"></i></span>
                          {/* <h4><a href={event.href}>{event.title}</a></h4> */}
                          <h4>{event.title}</h4>
                        </div>
                      </div>
                    </div>
                    <div className="lower-content">
                      <ul className="post-info clearfix">
                        <li><i className="flaticon-clock-circular-outline"></i>{event.dateRange}</li>
                        <li><i className="flaticon-gps"></i>{event.location ?? ''}</li>
                      </ul>
                      {/* <div className="links"><a href={event.href}>Read More<i className="flaticon-right-arrow"></i></a></div> */}
                      <div className="links"><a href="#">Read More<i className="flaticon-right-arrow"></i></a></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}










