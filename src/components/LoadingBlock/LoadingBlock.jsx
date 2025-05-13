import styles from './LoadingBlock.module.css';
import PropTypes from 'prop-types';

export const LoadingBlock = () => {
	return <div className={styles.loading}>Loading in process... Please wait</div>;
};
