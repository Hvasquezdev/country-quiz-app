enum ViewsEnum {
  Presentation = 'Presentation',
  ChooseGameTarget = 'ChooseGameTarget',
  GameBoard = 'GameBoard',
  Results = 'Results',
}

type viewTypes =
  | ViewsEnum.Presentation
  | ViewsEnum.ChooseGameTarget
  | ViewsEnum.GameBoard
  | ViewsEnum.Results;

export { ViewsEnum, viewTypes };
