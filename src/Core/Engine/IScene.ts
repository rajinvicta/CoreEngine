interface IScene {
  boot(): void;
  create(): void;
  update(): void;
  shutdown(): void;
}

export default IScene;
