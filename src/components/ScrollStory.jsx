import styles from './ScrollStory.module.css';

// This is the scroll container that provides the scroll height 
// for the pinned Three.js scene to animate through.
// It contains invisible "panels" that ScrollTrigger maps 
// to phases of the chocolate breaking animation.
export default function ScrollStory({ children }) {
  return (
    <div id="scroll-story" className={styles.wrapper}>
      {/* Phase spacers — these give scroll height to drive the 3D animation */}
      <div className={styles.phase} data-phase="intro" />
      <div className={styles.phase} data-phase="break" />
      <div className={styles.phase} data-phase="carob" />
      <div className={styles.phase} data-phase="lionsmane" />
      <div className={styles.phase} data-phase="spirulina" />

      {/* Actual content that appears after the 3D story */}
      <div id="content-start" className={styles.content}>
        {children}
      </div>
    </div>
  );
}
