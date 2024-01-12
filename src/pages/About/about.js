import images from '~/assets/images';
import './AboutPage.scss';

const AboutPage = (props) => {
    return (
        <div className="about-wrapper">
            <div className="page-title animate__animated animate__fadeInDown animate__delay-200ms animate__1s ">
                <h1>About Me</h1>
            </div>
            <div className="inner">
                <div className="page-content" data-aos="flip-right" data-aos-duration="800" data-aos-delay="1000">
                    <div className="avatar">
                        <img src={images.personalAvatar} alt="personal-img" />
                    </div>
                    <div className="content">
                        <h3 className="intro-title">Hi! I am Ryan Truong</h3>
                        <p>
                            A dedicated Front-End Web Developer with a passion for creating visually stunning and highly functional
                            websites. With a keen eye for design and a commitment to delivering exceptional user experiences, I specialize
                            in bringing digital ideas to life.
                        </p>
                    </div>
                </div>

                <div className="about-this-project" data-aos="zoom-in-up" data-aos-anchor-placement="top-center">
                    <div className="website-introduction">
                        <h1 className="project-title">About this website:</h1>
                        <p>
                            Welcome to my website - the most trusted and complete place for people who are passionate about technology and
                            want to enhance their work and entertainment experience through keyboards and related accessories. I am proud to
                            be the leading online shopping destination, bringing you variety, quality and satisfaction. Besides, this is a
                            website designed and built for the final project.
                        </p>

                        <h3 className="project-title">Members:</h3>
                        <p>Truong Vu Thuan - Ryan Truong</p>

                        <h3 className="project-title">Technologies & Frameworks using:</h3>
                        <ul className="tech-list">
                            <li>
                                <span className="tech-item">Front-End: </span>
                                <ol>
                                    <li>HTML: Crafting the structure and content of web pages.</li>
                                    <li>CSS: Styling and animating elements to enhance user interfaces.</li>
                                    <li>JavaScript(ES6+): Implementing dynamic and interactive features for a seamless user experience</li>
                                    <li>React.js: Building responsive and scalable single-page applications</li>
                                </ol>
                            </li>
                            <li>
                                <span className="tech-item">Back-End: </span>
                                <ol>
                                    <li>
                                        Node.js: a JavaScript runtime that allows developers to execute server-side code, enabling the
                                        creation of scalable and fast web applications.
                                    </li>
                                    <li>
                                        JSON Web Token (JWT): is a compact, self-contained means of securely transmitting information
                                        between FE and BE as a JSON object, often used for authentication and authorization in web
                                        development.
                                    </li>
                                    <li>Sequelize: as the ORM (Object-Relational Mapping) for interacting with your database.</li>
                                    <li>MySQL: Proficient in database management and optimization.</li>
                                </ol>
                            </li>
                        </ul>
                        <h3 className="project-title">Function in website:</h3>
                        <ol className="function-list">
                            <li>
                                <span className="function-item">For Customer:</span>
                                <ul>
                                    <li>Surfing the website as a guest</li>
                                    <li>Create an account</li>
                                    <li>Login into an account</li>
                                    <li>View products/Products details </li>
                                    <li>Buy Products</li>
                                    <li>Search/Filter Products</li>
                                    <li>Comment on products</li>
                                    <li>Manage personal profile: update email/phone/avatar</li>
                                    <li>Manage personal cart: update cart list</li>
                                </ul>
                            </li>

                            <li>
                                <span className="function-item">For Admin:</span>
                                <ul>
                                    <li>
                                        Manage products:
                                        <ol>
                                            <li>Create new product</li>
                                            <li>Delete product</li>
                                            <li>Update a product</li>
                                        </ol>
                                    </li>
                                    <li>Manage accounts: update role/account - create new account</li>
                                    <li>Manage orders: update status of orders</li>
                                    <li>Delete Comments</li>
                                </ul>
                            </li>
                        </ol>
                    </div>
                </div>
            </div>
            <div className="project-showcase" data-aos="fade-down" data-aos-anchor-placement="center-bottom" data-aos-duration="800">
                <h1 className="project-title">Find out more projects:</h1>

                <div className="project-list">
                    <div className="project-item item-1" data-aos="fade-up-right" data-aos-delay="1000">
                        <img src={images.project1} alt="project-1" />
                        <span>Hover This</span>
                        <div className="project-item-info">
                            <a href="https://phaothu2002x.github.io/project1-RealEstate/" target="_blank" rel="noreferrer">
                                Click Here!!
                            </a>
                        </div>
                    </div>
                    <div className="project-item item-2" data-aos="fade-down" data-aos-delay="1000">
                        <img src={images.project2} alt="project-2" />
                        <span>Hover This</span>
                        <div className="project-item-info">
                            <a href="https://phaothu2002x.github.io/project02/" target="_blank" rel="noreferrer">
                                Click Here!!
                            </a>
                        </div>
                    </div>
                    <div className="project-item item-3" data-aos="fade-up-left" data-aos-delay="1000">
                        <img src={images.project3} alt="project-3" />
                        <span>Hover This</span>
                        <div className="project-item-info">
                            <a href="https://phaothu2002x.github.io/project03-DentalCare/" target="_blank" rel="noreferrer">
                                Click Here!!
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
