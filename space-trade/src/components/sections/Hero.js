import React, { useState } from 'react';
import classNames from 'classnames';
import { SectionProps } from '../../utils/SectionProps';
import ButtonGroup from '../elements/ButtonGroup';
import Button from '../elements/Button';
import Image from '../elements/Image';
import Modal from '../elements/Modal';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';

const propTypes = {
  ...SectionProps.types
}

const defaultProps = {
  ...SectionProps.defaults
}

const useStyles = makeStyles((theme) => ({
	fullButton:{
		backgroundColor:  "#324f7b",
		borderRadius: "7px",
		color: "rgba(236, 237,237, 0.9)"
	},
	ghostButton:{
		backgroundColor:  "rgba(0, 0, 0, 0)",
		border: "2px solid #324f7b",
		borderRadius: "7px",
		color: "rgba(236, 237,237, 0.9)"
	},

}));

const Hero = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  ...props
}) => {

  const [videoModalActive, setVideomodalactive] = useState(false);

  const openModal = (e) => {
    e.preventDefault();
    setVideomodalactive(true);
  }

  const closeModal = (e) => {
    e.preventDefault();
    setVideomodalactive(false);
  }

  const outerClasses = classNames(
    'hero section center-content',
    topOuterDivider && 'has-top-divider',
    bottomOuterDivider && 'has-bottom-divider',
    hasBgColor && 'has-bg-color',
    invertColor && 'invert-color',
    className
  );

  const innerClasses = classNames(
    'hero-inner section-inner',
    topDivider && 'has-top-divider',
    bottomDivider && 'has-bottom-divider'
  );
  const classes = useStyles();

  return (
    <section
      {...props}
      className={outerClasses}
    >
      <div className="container-sm">
        <div className={innerClasses}>
          <div className="hero-content">
            <h1 className="mt-0 mb-16 reveal-from-bottom" data-reveal-delay="200" style={{textShadow: "0px 0px 5px rgba(236, 237,237, 0.6)"}}>
              Space<span style={{color: "rgb(55, 70, 92)"}}>Trade</span>
            </h1>
            <div className="container-xs">
              <p className="m-0 mb-32 reveal-from-bottom" data-reveal-delay="400">
                La app te llevará al espacio con cada trade que realices. En este viaje descubrirás diversas herramientas de utilidad. Únete ya y haz que tus ganacias despegen en el mundo del trading.
                </p>
              <br />
              <div className="reveal-from-bottom" data-reveal-delay="600">
                <ButtonGroup>
                    <Link to="/register">
						<Button className={classes.fullButton} wideMobile>
							Get started
						</Button>
                    </Link>
                  <Button tag="a" className={classes.ghostButton} wideMobile href="https://github.com/invict1/SpaceTrade">
                    View on Github
                    </Button>
                </ButtonGroup>
              </div>
            </div>
          </div>
          <div className="hero-figure reveal-from-bottom illustration-element-01" data-reveal-value="20px" data-reveal-delay="800">
            <a
              data-video="https://player.vimeo.com/video/174002812"
              href="#0"
              aria-controls="video-modal"
              onClick={openModal}
            >
              <Image
                className="has-shadow"
                src={require('./../../assets/images/video-placeholder.jpg')}
                alt="Hero"
                width={896}
                height={504} />
            </a>
          </div>
          <Modal
            id="video-modal"
            show={videoModalActive}
            handleClose={closeModal}
            video="https://player.vimeo.com/video/174002812"
            videoTag="iframe" />
        </div>
      </div>
    </section>
  );
}

Hero.propTypes = propTypes;
Hero.defaultProps = defaultProps;

export default Hero;