import SmartDepend from '../Dep/SmartDepend';

import Config from '../../src/Core/Control/Config';
import Expose from '../../src/Core/Control/Expose';
import Kernel from '../../src/Core/Control/Kernel';
import Loop from '../../src/Core/Control/Loop';
import ScaleManager from '../../src/Core/Control/ScaleManager';
import the from '../../src/Core/CoreEngine';
import DataFactory from '../../src/Core/Data/DataFactory';
import Func from '../../src/Core/Data/Func';
import Resource from '../../src/Core/Data/Resource';
import AnimationFactory from '../../src/Core/Engine/Animation/AnimationFactory';
import SheetAnim from '../../src/Core/Engine/Animation/SheetAnim';
import Tween from '../../src/Core/Engine/Animation/Tween';
import AnimationManager from '../../src/Core/Engine/GameObjects/Components/AnimationManager';
import Display from '../../src/Core/Engine/GameObjects/Components/Display';
import GOCore from '../../src/Core/Engine/GameObjects/Components/GOCore';
import Input from '../../src/Core/Engine/GameObjects/Components/Input';
import Media from '../../src/Core/Engine/GameObjects/Components/Media';
import Message from '../../src/Core/Engine/GameObjects/Components/Message';
import Position from '../../src/Core/Engine/GameObjects/Components/Position';
import Scale from '../../src/Core/Engine/GameObjects/Components/Scale';
import Dom from '../../src/Core/Engine/GameObjects/Dom';
import GOFactory from '../../src/Core/Engine/GameObjects/GOFactory';
import Sprite from '../../src/Core/Engine/GameObjects/Sprite';
import Text from '../../src/Core/Engine/GameObjects/Text';
import Video from '../../src/Core/Engine/GameObjects/Video';
import Loader from '../../src/Core/Engine/Loader';
import World from '../../src/Core/Engine/World';
import LoaderWall from '../../src/Core/Plugins/LoaderWall';
import ObjectHandler from '../../src/Core/Plugins/ObjectHandler';
import PhFactory from '../../src/Core/Plugins/Phaser/PhFactory';
import PhGame from '../../src/Core/Plugins/Phaser/PhGame';
import PhLoader from '../../src/Core/Plugins/Phaser/PhLoader';
import PhObjectFactory from '../../src/Core/Plugins/Phaser/PhObjectFactory';
import PhObjectHandler from '../../src/Core/Plugins/Phaser/PhObjectHandler';
import PhScene from '../../src/Core/Plugins/Phaser/PhScene';
import Screen from '../../src/Core/Plugins/Screen';
import ArrayUtil from '../../src/Core/Utils/ArrayUtil';
import NetworkUtil from '../../src/Core/Utils/NetworkUtil';
import Random from '../../src/Core/Utils/Random';
import RemoveDup from '../../src/Core/Utils/RemoveDup';
import UrlUtil from '../../src/Core/Utils/UrlUtil';
import Utils from '../../src/Core/Utils/Utils';




class ControlContainer {
  private _smartDepend: SmartDepend;

  protected _Config: any;
protected _Expose: any;
protected _Kernel: any;
protected _Loop: any;
protected _ScaleManager: any;
protected _the: any;
protected _DataFactory: any;
protected _Func: any;
protected _Resource: any;
protected _AnimationFactory: any;
protected _SheetAnim: any;
protected _Tween: any;
protected _AnimationManager: any;
protected _Display: any;
protected _GOCore: any;
protected _Input: any;
protected _Media: any;
protected _Message: any;
protected _Position: any;
protected _Scale: any;
protected _Dom: any;
protected _GOFactory: any;
protected _Sprite: any;
protected _Text: any;
protected _Video: any;
protected _Loader: any;
protected _World: any;
protected _LoaderWall: any;
protected _ObjectHandler: any;
protected _PhFactory: any;
protected _PhGame: any;
protected _PhLoader: any;
protected _PhObjectFactory: any;
protected _PhObjectHandler: any;
protected _PhScene: any;
protected _Screen: any;
protected _ArrayUtil: any;
protected _NetworkUtil: any;
protected _Random: any;
protected _RemoveDup: any;
protected _UrlUtil: any;
protected _Utils: any;


  constructor() {
    this._smartDepend = new SmartDepend();

    this._addModules();
    this._addDepends();
  }

  public getMain(): Kernel {
    let spEntity = <Kernel>this._smartDepend.resolve(this._Kernel);

    return spEntity;
  }

  private _addModules() {
    this._Config = this._smartDepend.addModule(Config, true);
this._Expose = this._smartDepend.addModule(Expose, false);
this._Kernel = this._smartDepend.addModule(Kernel, false);
this._Loop = this._smartDepend.addModule(Loop, true);
this._ScaleManager = this._smartDepend.addModule(ScaleManager, false);
this._the = this._smartDepend.addModule(the, false);
this._DataFactory = this._smartDepend.addModule(DataFactory, false);
this._Func = this._smartDepend.addModule(Func, false);
this._Resource = this._smartDepend.addModule(Resource, false);
this._AnimationFactory = this._smartDepend.addModule(AnimationFactory, false);
this._SheetAnim = this._smartDepend.addModule(SheetAnim, false);
this._Tween = this._smartDepend.addModule(Tween, false);
this._AnimationManager = this._smartDepend.addModule(AnimationManager, false);
this._Display = this._smartDepend.addModule(Display, false);
this._GOCore = this._smartDepend.addModule(GOCore, false);
this._Input = this._smartDepend.addModule(Input, false);
this._Media = this._smartDepend.addModule(Media, false);
this._Message = this._smartDepend.addModule(Message, false);
this._Position = this._smartDepend.addModule(Position, false);
this._Scale = this._smartDepend.addModule(Scale, false);
this._Dom = this._smartDepend.addModule(Dom, false);
this._GOFactory = this._smartDepend.addModule(GOFactory, false);
this._Sprite = this._smartDepend.addModule(Sprite, false);
this._Text = this._smartDepend.addModule(Text, false);
this._Video = this._smartDepend.addModule(Video, false);
this._Loader = this._smartDepend.addModule(Loader, false);
this._World = this._smartDepend.addModule(World, true);
this._LoaderWall = this._smartDepend.addModule(LoaderWall, false);
this._ObjectHandler = this._smartDepend.addModule(ObjectHandler, false);
this._PhFactory = this._smartDepend.addModule(PhFactory, false);
this._PhGame = this._smartDepend.addModule(PhGame, true);
this._PhLoader = this._smartDepend.addModule(PhLoader, false);
this._PhObjectFactory = this._smartDepend.addModule(PhObjectFactory, false);
this._PhObjectHandler = this._smartDepend.addModule(PhObjectHandler, false);
this._PhScene = this._smartDepend.addModule(PhScene, false);
this._Screen = this._smartDepend.addModule(Screen, false);
this._ArrayUtil = this._smartDepend.addModule(ArrayUtil, false);
this._NetworkUtil = this._smartDepend.addModule(NetworkUtil, false);
this._Random = this._smartDepend.addModule(Random, false);
this._RemoveDup = this._smartDepend.addModule(RemoveDup, false);
this._UrlUtil = this._smartDepend.addModule(UrlUtil, false);
this._Utils = this._smartDepend.addModule(Utils, false);

  }

  private _addDepends() {
    this._smartDepend.addDependency(this._Kernel, this._Expose);
this._smartDepend.addDependency(this._Kernel, this._GOFactory);
this._smartDepend.addDependency(this._Kernel, this._World);
this._smartDepend.addDependency(this._Kernel, this._Config);
this._smartDepend.addDependency(this._Kernel, this._Loader);
this._smartDepend.addDependency(this._Kernel, this._Utils);
this._smartDepend.addDependency(this._Kernel, this._AnimationFactory);
this._smartDepend.addDependency(this._Kernel, this._Loop);
this._smartDepend.addDependency(this._Kernel, this._ScaleManager);


this._smartDepend.addDependency(this._Loop, this._DataFactory);
this._smartDepend.addDependency(this._Loop, this._ArrayUtil);


this._smartDepend.addDependency(this._ScaleManager, this._Config);


this._smartDepend.addDependency(this._DataFactory, this._Resource);
this._smartDepend.addDependency(this._DataFactory, this._Func);


this._smartDepend.addDependency(this._Resource, this._UrlUtil);


this._smartDepend.addDependency(this._AnimationFactory, this._Tween);


this._smartDepend.addDependency(this._SheetAnim, this._ObjectHandler);
this._smartDepend.addDependency(this._SheetAnim, this._ArrayUtil);
this._smartDepend.addDependency(this._SheetAnim, this._Screen);


this._smartDepend.addDependency(this._Tween, this._Loop);


this._smartDepend.addDependency(this._AnimationManager, this._Tween);
this._smartDepend.addDependency(this._AnimationManager, this._SheetAnim);


this._smartDepend.addDependency(this._Display, this._ObjectHandler);
this._smartDepend.addDependency(this._Display, this._ScaleManager);


this._smartDepend.addDependency(this._GOCore, this._World);


this._smartDepend.addDependency(this._Input, this._ObjectHandler);
this._smartDepend.addDependency(this._Input, this._ScaleManager);


this._smartDepend.addDependency(this._Message, this._ObjectHandler);


this._smartDepend.addDependency(this._Position, this._ScaleManager);
this._smartDepend.addDependency(this._Position, this._ObjectHandler);


this._smartDepend.addDependency(this._Scale, this._ScaleManager);
this._smartDepend.addDependency(this._Scale, this._ObjectHandler);
this._smartDepend.addDependency(this._Scale, this._ArrayUtil);


this._smartDepend.addDependency(this._Dom, this._Position);
this._smartDepend.addDependency(this._Dom, this._Scale);
this._smartDepend.addDependency(this._Dom, this._Display);
this._smartDepend.addDependency(this._Dom, this._Input);
this._smartDepend.addDependency(this._Dom, this._GOCore);
this._smartDepend.addDependency(this._Dom, this._Screen);
this._smartDepend.addDependency(this._Dom, this._World);


this._smartDepend.addDependency(this._GOFactory, this._Dom);
this._smartDepend.addDependency(this._GOFactory, this._Sprite);
this._smartDepend.addDependency(this._GOFactory, this._Text);
this._smartDepend.addDependency(this._GOFactory, this._Video);
this._smartDepend.addDependency(this._GOFactory, this._Screen);


this._smartDepend.addDependency(this._Sprite, this._Position);
this._smartDepend.addDependency(this._Sprite, this._Scale);
this._smartDepend.addDependency(this._Sprite, this._Display);
this._smartDepend.addDependency(this._Sprite, this._Input);
this._smartDepend.addDependency(this._Sprite, this._GOCore);
this._smartDepend.addDependency(this._Sprite, this._AnimationManager);
this._smartDepend.addDependency(this._Sprite, this._Screen);
this._smartDepend.addDependency(this._Sprite, this._World);


this._smartDepend.addDependency(this._Text, this._Position);
this._smartDepend.addDependency(this._Text, this._Scale);
this._smartDepend.addDependency(this._Text, this._Display);
this._smartDepend.addDependency(this._Text, this._Message);
this._smartDepend.addDependency(this._Text, this._Input);
this._smartDepend.addDependency(this._Text, this._GOCore);
this._smartDepend.addDependency(this._Text, this._Screen);
this._smartDepend.addDependency(this._Text, this._World);


this._smartDepend.addDependency(this._Video, this._Position);
this._smartDepend.addDependency(this._Video, this._Scale);
this._smartDepend.addDependency(this._Video, this._Display);
this._smartDepend.addDependency(this._Video, this._Input);
this._smartDepend.addDependency(this._Video, this._GOCore);
this._smartDepend.addDependency(this._Video, this._Media);
this._smartDepend.addDependency(this._Video, this._AnimationManager);
this._smartDepend.addDependency(this._Video, this._Screen);
this._smartDepend.addDependency(this._Video, this._World);


this._smartDepend.addDependency(this._Loader, this._LoaderWall);
this._smartDepend.addDependency(this._Loader, this._Resource);
this._smartDepend.addDependency(this._Loader, this._Screen);


this._smartDepend.addDependency(this._World, this._Config);
this._smartDepend.addDependency(this._World, this._Screen);
this._smartDepend.addDependency(this._World, this._ScaleManager);
this._smartDepend.addDependency(this._World, this._ArrayUtil);


this._smartDepend.addDependency(this._LoaderWall, this._PhLoader);


this._smartDepend.addDependency(this._ObjectHandler, this._PhObjectHandler);


this._smartDepend.addDependency(this._PhFactory, this._PhScene);


this._smartDepend.addDependency(this._PhGame, this._Config);
this._smartDepend.addDependency(this._PhGame, this._PhFactory);
this._smartDepend.addDependency(this._PhGame, this._ArrayUtil);


this._smartDepend.addDependency(this._PhLoader, this._PhObjectFactory);
this._smartDepend.addDependency(this._PhLoader, this._UrlUtil);
this._smartDepend.addDependency(this._PhLoader, this._Random);


this._smartDepend.addDependency(this._PhObjectFactory, this._PhGame);


this._smartDepend.addDependency(this._PhObjectHandler, this._PhObjectFactory);


this._smartDepend.addDependency(this._PhScene, this._Loop);


this._smartDepend.addDependency(this._Screen, this._PhGame);
this._smartDepend.addDependency(this._Screen, this._PhObjectFactory);


this._smartDepend.addDependency(this._Utils, this._ArrayUtil);
this._smartDepend.addDependency(this._Utils, this._NetworkUtil);
this._smartDepend.addDependency(this._Utils, this._RemoveDup);
this._smartDepend.addDependency(this._Utils, this._UrlUtil);
this._smartDepend.addDependency(this._Utils, this._Random);



  }

}

export default ControlContainer;