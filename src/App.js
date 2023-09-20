import React, { useEffect, useState } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";
import NewsCards from "./components/NewsCards/NewsCards";
import wordsToNumbers from "words-to-numbers";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";


const LogoContainer = styled("div")(({ theme }) => ({
  padding: "0 5%",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  width: "100%",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column-reverse",
    textAlign: "center",
  },
}));

const LogoImg = styled("img")(({ theme }) => ({
  height: "27vmin",
  borderRadius: "15%",
  padding: "0 5%",
  margin: "3% 0",
  [theme.breakpoints.down("sm")]: {
    height: "35vmin",
  },
}));

const InfoContainer = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-around",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));

const Card = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "50%",
  padding: "3%",
  borderRadius: 10,
  color: "white",
  backgroundColor: "rgba(21, 101, 192)",
  margin: "0 12px",
  textAlign: "center",
  height: "25vmin",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column-reverse",
    textAlign: "center",
    width: "100%",
    height: "initial",
    "&:nth-of-type(1)": {
      marginBottom: "12px",
    },
  },
}));

const App = () => {
  const [activeArticle, setActiveArticle] = useState(-1);
  const [newsArticles, setNewsArticles] = useState([]);

  useEffect(() => {
    alanBtn({
      key: "47c199c66d03aab149d77011b646ca782e956eca572e1d8b807a3e2338fdd0dc/stage",
      onCommand: ({ command, articles, number }) => {
        if (command === "newHeadlines") {
          setNewsArticles(articles);
          setActiveArticle(-1);
        } else if (command === "highlight") {
          setActiveArticle((prev) => prev + 1);
        } else if (command === 'open') {
          const parsedNumber = number.length > 2 ? wordsToNumbers(number, { fuzzy: true })
              : number;
          const article = articles[parsedNumber - 1];

          if (parsedNumber > 20) {
            alanBtn().playText("Please try that again...");
          } else if (article) {
            window.open(article.url, "_blank");
            alanBtn().playText("Opening...");
          } else {
            alanBtn().playText("Please try that again...");
          }
        }
      }
    });
  }, []);

  return (
    <div>
      <LogoContainer>
        {newsArticles.length ? (
          <InfoContainer>
            <Card>
              <Typography variant="h5" component="h2">
                Try saying: <br />
                <br />
                Open Article number [4]
              </Typography>
            </Card>
            <Card>
              <Typography variant="h5" component="h2">
                Try saying: <br />
                <br />
                Go Back
              </Typography>
            </Card>
          </InfoContainer>
        ) : null}
        <LogoImg
          src="https://miro.medium.com/max/600/1*CJyCnZVdr-EfgC27MAdFUQ.jpeg"
          alt="alanai"
        />
      </LogoContainer>
      <NewsCards articles={newsArticles} activeArticle={activeArticle} />
    </div>
  );
};

export default App;
