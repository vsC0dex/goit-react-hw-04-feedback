import React, { useState } from 'react';
import Statistics from './Rewievs/Statistics';
import Controls from './Rewievs/Controls';
import Section from './Section/Section';
import Notification from './Rewievs/Notification';

const App = () => {
  const [votes, setVotes] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const increaseRating = name => {
    setVotes(prevState => {
      const value = prevState[name];

      return { ...prevState, [name]: value + 1 };
    });
  };

  const countTotalFeedback = () => {
    const { good, neutral, bad } = votes;
    const total = good + neutral + bad;
    return total;
  };

  const countPositiveFeedbackPercentage = () => {
    const goodGrades = votes.good;
    const totalGrades = countTotalFeedback();
    return totalGrades === 0 ? 0 : Math.round((goodGrades / totalGrades) * 100);
  };

  const total = countTotalFeedback();
  const positive = countPositiveFeedbackPercentage();
  const options = Object.keys(votes);
  const isAnyGrades = Object.values(votes).reduce((acc, item) => acc + item, 0);

  return (
    <>
      <Section title="Statistics">
        {!isAnyGrades ? (
          <Notification message="There is no feedback" />
        ) : (
          <Statistics statData={votes} total={total} positive={positive} />
        )}
      </Section>
      <Section title="Please leave feedback">
        <Controls onLeaveFeedback={increaseRating} options={options} />
      </Section>
    </>
  );
};

export default App;

/*
export default class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  increaseRating = grade => {
    this.setState(prevState => ({
      [grade]: prevState[grade] + 1,
    }));
  };

  countTotalFeedback = () => {
    return Object.values(this.state).reduce((acc, item) => acc + item, 0);
  };

  countPositiveFeedbackPercentage = () => {
    const goodGrades = this.state.good;
    const totalGrades = this.countTotalFeedback();
    return totalGrades === 0 ? 0 : Math.round((goodGrades / totalGrades) * 100);
  };

  render() {
    const total = this.countTotalFeedback();
    const positive = this.countPositiveFeedbackPercentage();
    const options = Object.keys(this.state);
    const isAnyGrades = Object.values(this.state).reduce(
      (acc, item) => acc + item,
      0
    );

    return (
      <>
        <Section title="Statistics">
          {!isAnyGrades ? (
            <Notification message="There is no feedback" />
          ) : (
            <Statistics
              statData={this.state}
              total={total}
              positive={positive}
            />
          )}
        </Section>
        <Section title="Please leave feedback">
          <Controls onLeaveFeedback={this.increaseRating} options={options} />
        </Section>
      </>
    );
  }
}
*/
