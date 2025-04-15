// src/components/homes/Leaderboard.tsx
import React, { useState, useEffect } from "react";
import { getUserRankings } from "../../controller/UserController";
import styles from "../../styles/Leaderboard.module.css";

interface User {
  _id: string;
  name: string;
  totalScore: number;
  spots: number;
  updates: number;
  profilePicture: string;
}

const Leaderboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchRankings = async () => {
      const data = await getUserRankings();
      setUsers(data);
    };
    fetchRankings();
  }, []);

  return (
    <div className={styles.leaderboard}>
      <div className={styles.header}>
        <span className={styles.userIcon}>👤</span>
        <h2>USER RANKING</h2>
        <div className={styles.icons}>
          <span>📊</span>
          <span>📈</span>
          <span>✖</span>
        </div>
      </div>
      {users.length === 0 ? (
        <p className={styles.noUsers}>No users found.</p>
      ) : (
        users.map((user, index) => (
          <div
            key={user._id}
            className={`${styles.userRank} ${index < 3 ? styles.topRank : ""}`}
          >
            <div className={styles.rank}>
              {index < 3 ? (
                <span className={`${styles.star} ${styles[`star${index + 1}`]}`}>
                  {index === 0 && "⭐"}
                  {index === 1 && "🌟"}
                  {index === 2 && "✨"}
                </span>
              ) : (
                <span className={styles.circle}>{index + 1}</span>
              )}
              <span className={styles.position}>{index + 1}</span>
            </div>
            <div className={styles.userInfo}>
              <div className={styles.userDetails}>
                <p className={styles.name}>{user.name}</p>
                <p className={styles.score}>TOTAL SCORE: {user.totalScore}</p>
                <p className={styles.stats}>
                  <span>🔍 {user.spots} spots</span> +{" "}
                  <span>📤 {user.updates} updates</span>
                </p>
              </div>
              <img
                src={user.profilePicture}
                alt={`${user.name}'s profile`}
                className={styles.profilePic}
                onError={(e) =>
                  (e.currentTarget.src = "/images/default.jpg")
                }
              />
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Leaderboard;