import React from "react";
import Container from "@material-ui/core/Container";
import { PostCard } from "./PostCard";
import { WarnAndErrorContent } from "./WarnAndErrorContent";
import { LoadCard } from "./LoadCard";
import "../scss/base.scss";

export class Content extends React.Component {
  constructor(props) {
    super(props);
  }

  genPostCards(posts) {
    let postComponents = posts.map((post, index) => {
      return <PostCard key={index} post={post} />;
    });
    postComponents.push(<LoadCard key={posts.length} lastCard={true} />);
    return postComponents;
  }

  genLoadCards() {
    return [...Array(5).keys()].map((i) => {
      return <LoadCard key={i} />;
    });
  }

  genContent() {
    let { isLoading, isError, posts } = this.props.state;

    if (isLoading) {
      return this.genLoadCards();
    } else {
      if (isError) return <WarnAndErrorContent type="error" />;
      else {
        if (posts.length === 0) {
          return <WarnAndErrorContent type="warn" />;
        } else {
          return this.genPostCards(posts);
        }
      }
    }
  }

  render() {
    return (
      <Container className="margin-top-60" maxWidth="md">
        {this.genContent()}
      </Container>
    );
  }
}
