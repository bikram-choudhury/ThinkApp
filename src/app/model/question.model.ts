export interface questionModel {
    question: string,
    options: {[key:string]: any}[],
    Title: string,
    slug: string,
    Type: string,
    isActive: boolean,
    isVisited: boolean,
    notAnswered: boolean
  }