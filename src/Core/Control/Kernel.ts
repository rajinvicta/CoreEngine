import Expose from './Expose';

import GOFactory from '../Engine/GameObjects/GOFactory';
import World from '../Engine/World';
import Utils from '../Utils/Utils';
import Loader from '../Engine/Loader';
import Loop from './Loop';
import Config from './Config';
import AnimationFactory from '../Engine/Animation/AnimationFactory';
import ScaleManager from '../Control/ScaleManager';

class Kernel {
  private _expose: Expose;

  private _goFactory: GOFactory;
  private _world: World;
  private _utils: Utils;
  private _loader: Loader;
  private _loop: Loop;
  private _config: Config;
  private _animationFactory: AnimationFactory;
  private _scaleManager: ScaleManager;

  constructor(expose: Expose, goFactory: GOFactory, world: World, config: Config,
  loader: Loader, utils: Utils, animationFactory: AnimationFactory,
  loop: Loop, scaleManager: ScaleManager) {
    this._expose = expose;

    this._goFactory = goFactory;
    this._config = config;
    this._world = world;
    this._loader = loader;
    this._utils = utils;
    this._loop = loop;
    this._animationFactory = animationFactory;
    this._scaleManager = scaleManager;

    this._exposeAPI();
  }

  public sayHello() {
    console.log("Core Engine: Hello World!");
  }

  private _exposeAPI() {
    this._exposeObject('animationFactory', this._animationFactory);
    this._exposeObject('goFactory', this._goFactory);
    this._exposeObject('world', this._world);
    this._exposeObject('loader', this._loader);
    this._exposeObject('loop', this._loop);
    this._exposeObject('utils', this._utils);
    this._exposeObject('config', this._config);
    this._exposeObject('scaleManager', this._scaleManager);
  }

  //Foreign Dependencies
  private _exposeObject(name: string, object: any) {
    this._expose.add(name, object);
  }
}

export default Kernel;
