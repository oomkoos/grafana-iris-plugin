# Grafana Data Source Plugin

[![CircleCI](https://circleci.com/gh/grafana/simple-datasource/tree/master.svg?style=svg)](https://circleci.com/gh/grafana/simple-datasource/tree/master)

## What is this Grafana Data Source Plugin?
It's an in-house wildcard metrics solution, where you can define any query endpoint and a request body to obtain the data you need to display some graph.
Timeseries and single value display is supported.

## Getting started
### Build the plugin
Navigate to the specific plugin source code in the `grafana-plugins` directory where the package.json resides.
1. Install dependencies
    ```BASH
    yarn install
    ```
1. Build the plugin in development mode or run in watch mode
    ```BASH
    yarn dev
    ```
    ```BASH
    yarn watch
    ```
1. Build plugin in production mode
    ```BASH
    yarn build
    ```

## Learn more
- [Build a data source plugin tutorial](https://grafana.com/tutorials/build-a-data-source-plugin)
- [Grafana documentation](https://grafana.com/docs/)
- [Grafana Tutorials](https://grafana.com/tutorials/) - Grafana Tutorials are step-by-step guides that help you make the most of Grafana
- [Grafana UI Library](https://developers.grafana.com/ui) - UI components to help you build interfaces using Grafana Design System
