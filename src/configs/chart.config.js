import { Chart } from "react-chartjs-2";
import "chartjs-plugin-colorschemes/src/plugins/plugin.colorschemes";
import { Celestial6 } from "chartjs-plugin-colorschemes/src/colorschemes/colorschemes.office";

export default () => {
  Chart.defaults.global.elements.rectangle.borderWidth = 1;
  Chart.defaults.global.plugins.colorschemes = {
    scheme: Celestial6,
    fillAlpha: 0.5,
    reverse: false,
    override: false
  };
  Chart.scaleService.updateScaleDefaults("linear", {
    ticks: {
      min: 0
    }
  });
};
