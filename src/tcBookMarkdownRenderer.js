import React from "react"
import CommonMark from "commonmark"
import ReactRenderer from "commonmark-react-renderer"
import { Container, Header, Grid, Segment, List, Sticky, Rail, Divider } from 'semantic-ui-react'
import { Link } from "react-router-dom"
// import Page, { Grid, GridColumn } from '@atlaskit/page';
// import { colors } from '@atlaskit/theme';
// import styled from 'styled-components';
// import { Group, Item } from '@atlaskit/navigation-next'
const parser = new CommonMark.Parser()
const renderer = new ReactRenderer({sourcePos: true})

class TcbookMarkdownRenderer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tcbook: props.tcbook,
      author: props.tcbook.author
    }
  }
 


  //takes a string and replaces spaces with "-"
  nameToId = (name) => (
    name.replace(/\s+/g, '-').toLowerCase()
  )

  
// for generating the markdown and adding it span.ids that we can reference in our table of contents
  createRenderedMarkdownWithLinkableHeadings = () => {
    var ast = parser.parse(this.state.tcbook.bookContent)
    var bodynode
    var walker = ast.walker()
    while ((ast = walker.next())) {
      bodynode = ast.node
      if (ast.entering && bodynode.type === 'heading') {
        var invisibleNode = parser.parse(`<span id=${this.nameToId(bodynode.firstChild.literal)} style="display:hidden"></span>`)
        bodynode.lastChild.insertBefore(invisibleNode.firstChild.firstChild)
      }
    }
    return renderer.render(bodynode)
  }

  // for generating the table of contents data structure Typeof Array
  generateTableOfContentsData = () => {
    var node
    var reactToc = []
    var astToc = parser.parse(this.state.tcbook.bookContent)
    var walkerToc = astToc.walker()
    while ((astToc = walkerToc.next())) {
      node = astToc.node
      if (astToc.entering && node.type === 'heading') {
        reactToc.push({element: node.type, level: node.level, sourcePos: node.sourcepos, literal: node.firstChild.literal, id: this.nameToId(node.firstChild.literal)})
      }
    }

    return reactToc
  }
  // for generating the table of contents UI TODO:Move to components folder and import as component
  tableOfContentsUI = () => (
    <List divided={true}>
      {
        this.generateTableOfContentsData().map(heading => {
          return (
            <List.Item as='a' key={heading.id} href={`${this.props.pathname}#${heading.id}`} content={heading.literal} />
          )
        }
        )
      }
    </List>
  )

  otherBooksUI = () => (
    <ul style={{listStyleType: 'none'}}>
      {
        this.state.author.tcBooks.map(tcbook => {
          return (
            <li key={tcbook.id}>
              <Link to={{pathname: `/book/${tcbook.id}/${tcbook.bookTitle.replace(/\s+/g, '-').toLowerCase()}`}}>{tcbook.bookTitle}</Link>
            </li>
          )
        })
      }
    </ul>
  )
  
  handleContextRef = contextRef => this.setState({ contextRef })

  render() {
   const { tcbook, author, contextRef } = this.state;

  return (
    <div ref={this.handleContextRef}>
      <Container>
        <Grid divided inverted stackable>
            <Grid.Column width={4}>
              <Rail close position="left">
                <Sticky context={contextRef}>
                  <Segment size={'large'}>
                    <Header as='h3'>Contents</Header>
                    {this.tableOfContentsUI()}
                  </Segment>
                </Sticky>
              </Rail>
            </Grid.Column>
            
          <Grid.Column width={12}>
            <Header as='h1'>{tcbook.bookTitle}</Header>
            <Divider />
            {this.createRenderedMarkdownWithLinkableHeadings()}
            <Divider />
              {
                author && <div>
                  <p style={{fontWeight: 'bold'}}>Other Books by {author.fullName}: </p>
                  {this.otherBooksUI}
                </div>
              }
          </Grid.Column>
        </Grid>
      </Container>
    </div>
  )
}
}

export default TcbookMarkdownRenderer
