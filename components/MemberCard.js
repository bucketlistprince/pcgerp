import styles from '../styles/MemberCard.module.css';

const MemberCard = ({ member }) => {
  return (
    <div className={styles.card}>
      <h3>{member.name}</h3>
      <p>Age Group: {member.ageGroup}</p>
    </div>
  );
};

export default MemberCard;
