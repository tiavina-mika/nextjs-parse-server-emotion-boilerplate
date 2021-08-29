import {
  Desktop, LargeDesktop, Mobile, MobileTablet, Tablet, TabletDesktop,
  useResponsive,
} from '../components/Responsive';
import Typography from '../components/Typography';

const Responsive = () => {
  const {
    isMobile, isMobileTablet, isTablet, isDesktop, isTabletDesktop,
    isLargeDesktop,
  } = useResponsive();

  return (
    <div className="flexColumn">
      <div className="flexColumn">
        <Typography level={2} variant="title">
          with media query
        </Typography>
        <div>
          {isMobile && 'mobile'}
          {isMobileTablet && 'mobile tablet'}
          {isTablet && 'tablet'}
          {isTabletDesktop && 'tablet desktop'}
          {isDesktop && 'desktop'}
          {isLargeDesktop && 'large desktop'}
        </div>
      </div>

      <div className="flexColumn">
        <Typography level={2} variant="title">
          with component
        </Typography>
        <div>
          <Mobile>Mobile</Mobile>
          <MobileTablet>MobileTablet</MobileTablet>
          <Tablet>Tablet</Tablet>
          <TabletDesktop>TabletDesktop</TabletDesktop>
          <Desktop>Desktop</Desktop>
          <LargeDesktop>LargeDesktop</LargeDesktop>
        </div>
      </div>
    </div>
  );
};

export default Responsive;
