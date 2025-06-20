# To learn more about how to use Nix to configure your environment
# see: https://firebase.google.com/docs/studio/customize-workspace
{pkgs}: {
  # Which nixpkgs channel to use.
  channel = "stable-24.11"; # or "unstable"
  # Use https://search.nixos.org/packages to find packages
  packages = [
    pkgs.nodejs_20
    pkgs.zulu
  ];
  # Sets environment variables in the workspace
  env = {};
  # This adds a file watcher to startup the firebase emulators. The emulators will only start if
  # a firebase.json file is written into the user's directory
  services.firebase.emulators = {
    detect = true;
    projectId = "msstaden-studio";
    services = ["auth" "firestore"];
  };
  idx = {
    # Search for the extensions you want on https://open-vsx.org/ and use "publisher.id"
    extensions = [
      # "vscodevim.vim"
      "bradlc.vscode-tailwindcss"
      "dracula-theme.theme-dracula"
      "eamodio.gitlens"
      "esbenp.prettier-vscode"
      "felipecaputo.git-project-manager"
      "mhutchie.git-graph"
      "pinage404.git-extension-pack"
      "PKief.material-icon-theme"
      "christian-kohler.npm-intellisense"
      "donjayamanne.githistory"
      "dsznajder.es7-react-js-snippets"
      "ecmel.vscode-html-css"
      "eg2.vscode-npm-script"
      "imgildev.vscode-tailwindcss-snippets"
      "viijay-kr.react-ts-css"
      "redhat.java"
      "redhat.vscode-yaml"
    ];
    workspace = {
      onCreate = {
        default.openFiles = [
          "src/app/page.tsx"
        ];
      };
    };
    # Enable previews and customize configuration
    previews = {
      enable = true;
      previews = {
        web = {
          command = ["npm" "run" "dev" "--" "--port" "$PORT" "--hostname" "0.0.0.0"];
          manager = "web";
        };
      };
    };
  };
}
