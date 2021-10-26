import GoFactory from './Engine/GameObjects/GOFactory';
import World from './Engine/World';
import Utils from './Utils/Utils';
import Loader from './Engine/Loader';
import AnimationFactory from './Engine/Animation/AnimationFactory';
import Loop from './Control/Loop';
import Config from './Control/Config';
import ScaleManager from './Control/ScaleManager';

/**
 * @class the CoreEngine API.
 */
class CoreEngine {
  public static goFactory: GoFactory;
  public static world: World;
  public static loader: Loader;
  public static utils: Utils;
  public static animationFactory: AnimationFactory;
  public static loop: Loop;
  public static config: Config;
  public static scaleManager: ScaleManager;
}


export default CoreEngine;
