<template>
  <div v-if="loading">
    <div class="absolute w-full h-full bg-gray-800 opacity-30" id="loadingPage">
      <div class="flex justify-center">
        <div
          class="inline-block w-24 h-24 border-t-8 border-[var(--color-primary)] rounded-full animate-spin mt-[100px]"
        ></div>
      </div>
    </div>
  </div>

  <div class="container" id="divQuiz">
    <!-- card questions -->
    <div class="flex items-center justify-center">
      <div
        class="block p-6 rounded-lg shadow-lg bg-[var(--coolor-bg-card)] min-w-full"
      >
        <div class="my-6 mb-3">
          <h6>Quiz</h6>
          <p class="text-gray-600 text-sm">
            Question {{ index + 1 }} of {{ questions.length }}
          </p>
          <div class="w-full bg-gray-200 h-2 rounded-lg my-2">
            <div
              class="bg-[var(--color-primary)] h-2 rounded-lg"
              :style="{
                width: `${((index + 1) / questions.length) * 100}%`,
              }"
            ></div>
          </div>
          <h6 class="my-2">Question {{ index + 1 }}</h6>
          <span
            class="visually-hidden font-semibold"
            v-html="loading ? 'Loading...' : currentQuestion.question"
          ></span>
        </div>

        <form v-if="currentQuestion">
          <div class="">
            <div v-for="answer in currentQuestion.answers">
              <input
                type="radio"
                @change.prevent="handleSubmit"
                v-model="checkedAnswers"
                :index="currentQuestion.key"
                :key="answer"
                :value="answer"
                :id="currentQuestion.key"
              />
              <label
                class="form-check-label inline-block text-gray-800"
                v-html="answer"
                :for="currentQuestion.key"
              ></label>
            </div>
          </div>

          <div class="w-full py-3">
            <button
              v-if="index > 0"
              @click.prevent="index--"
              class="float-left"
            >
              Previous
            </button>
            <button
              v-if="index < questions.length - 1"
              class="float-right"
              @click.prevent="index++"
            >
              Next
            </button>
            <button
              @click.prevent="handleFinish"
              v-if="index == questions.length - 1"
              class="bg-[var(--color-secondary)] :hover:bg-[var(--color-secondary-hover)] float-right"
            >
              Finish
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!-- score -->
  <div class="flex justify-center items-center">
    <div id="divScore" hidden>
      <h1>You score: {{ correctAnswers }}</h1>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      questions: [],
      loading: true,
      index: 0,
    };
  },
  computed: {
    currentQuestion() {
      if (this.questions !== []) {
        return this.questions[this.index];
      }
      return null;
    },
    correctAnswers() {
      if (this.questions && this.questions.length > 0) {
        let streakCounter = 0;
        this.questions.forEach(function (question) {
          if (!question.rightAnswer) {
            return;
          } else if (question.rightAnswer === true) {
            streakCounter++;
          }
        });
        return streakCounter;
      } else {
        return "--";
      }
    },
    quizCompleted() {
      if (this.questions.length === 0) {
        return false;
      }
      /* Check if all questions have been answered */
      let questionsAnswered = 0;
      this.questions.forEach(function (question) {
        question.rightAnswer !== null ? questionsAnswered++ : null;
      });
      return questionsAnswered === this.questions.length;
    },
    score() {
      if (this.questions !== []) {
        return {
          allQuestions: this.questions.length,
          answeredQuestions: this.questions.reduce((count, currentQuestion) => {
            if (currentQuestion.userAnswer) {
              // userAnswer is set when user has answered a question, no matter if right or wrong
              count++;
            }
            return count;
          }, 0),
          correctlyAnsweredQuestions: this.questions.reduce(
            (count, currentQuestion) => {
              if (currentQuestion.rightAnswer) {
                // rightAnswer is true, if user answered correctly
                count++;
              }
              return count;
            },
            0
          ),
        };
      } else {
        return {
          allQuestions: 0,
          answeredQuestions: 0,
          correctlyAnsweredQuestions: 0,
        };
      }
    },
  },
  watch: {
    quizCompleted(completed) {
      completed &&
        setTimeout(() => {
          this.$emit("quiz-completed", this.score);
        }, 3000);
    },
  },
  methods: {
    async fetchQuestions() {
      this.loading = true;
      //fetching questions from api
      let response = await fetch("http://localhost:3003/api/quiz/14");
      let index = 0; //To identify single answer
      let data = await response.json();
      let questions = data.questions.map((question) => {
        question.answers = [
          question.correct_answer,
          ...question.incorrect_answers,
        ];
        //shuffle above array
        for (let i = question.answers.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [question.answers[i], question.answers[j]] = [
            question.answers[j],
            question.answers[i],
          ];
        }
        //add right answers and key
        question.rightAnswer = null;
        question.key = index;
        index++;
        return question;
      });
      this.questions = questions;
      this.loading = false;
    },

    setLoading() {
      this.loading = true;

      setTimeout(() => {
        this.loading = false;
      }, 3000);
    },
    handleSubmit(e) {
      let index = e.target.getAttribute("index");
      let value = e.target.getAttribute("value");
      console.log(e.target, "e.target", index, "index", value, "value");
      let userAnswer = value;
      if (!this.loading) {
        this.setLoading();
        this.questions[index].userAnswer = userAnswer;
        this.checkCorrectAnswer(e, index);
      }
    },

    handleFinish() {
      document.getElementById("divScore").hasAttribute("hidden")
        ? document.getElementById("divScore").removeAttribute("hidden")
        : null;
      document.getElementById("divQuiz").style.display = "none";
    },

    checkCorrectAnswer(e, index) {
      console.log("checkCorrectAnswer", e, index);
      let question = this.questions[index];
      if (question.userAnswer) {
        if (this.index < this.questions.length - 1) {
          setTimeout(
            function () {
              this.index += 1;
            }.bind(this),
            3000
          );
        }
        if (question.userAnswer === question.correct_answer) {
          /* Set class on Button if user answered right, to celebrate right answer with animation joyfulButton */
          e.target.classList.add("rightAnswer");
          /* Set rightAnswer on question to true, computed property can track a streak out of 20 questions */
          this.questions[index].rightAnswer = true;
        } else {
          /* Mark users answer as wrong answer */
          e.target.classList.add("wrongAnswer");
          this.questions[index].rightAnswer = false;
          /* Show right Answer */
          let correctAnswer = this.questions[index].correct_answer;
          let allButtons = document.querySelectorAll(`[index="${index}"]`);
          allButtons.forEach(function (button) {
            if (button.innerHTML === correctAnswer) {
              button.classList.add("showRightAnswer");
            }
          });
        }
      }
    },
  },
  mounted() {
    this.fetchQuestions();
  },
};
</script>

<style scoped>
.container {
  margin: 1rem auto;
  padding: 1rem;
  max-width: 750px;
}
</style>
