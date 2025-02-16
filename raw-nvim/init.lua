require('packer').startup(function(use)
    use 'wbthomason/packer.nvim' -- Gerenciador de plugins
    use 'williamboman/mason.nvim' -- Mason
    use {
        'nvim-telescope/telescope.nvim',
        requires = { {'nvim-lua/plenary.nvim'} }
    }
    use 'neovim/nvim-lspconfig'
    use 'hrsh7th/nvim-cmp'
    use 'hrsh7th/cmp-nvim-lsp'
    use {
        'nvim-treesitter/nvim-treesitter',
        -- run = ':TSUpdate'
    }
    use 'preservim/nerdtree'
    use 'jmcantrell/vim-virtualenv'
    use 'folke/todo-comments.nvim'
    use 'rose-pine/neovim'
    use {
        'kdheepak/lazygit.nvim',
        cmd = "LazyGit",
        requires = {
            'nvim-lua/plenary.nvim',
        },
    }
    use {
        'jose-elias-alvarez/null-ls.nvim',
        requires = { 'nvim-lua/plenary.nvim' }
    }
    use 'nvim-treesitter/nvim-treesitter-context'
    use 'nvim-lualine/lualine.nvim'
    use 'simrat39/symbols-outline.nvim'
    use 'akinsho/toggleterm.nvim'
    use "lukas-reineke/indent-blankline.nvim"
    use 'morhetz/gruvbox'
    use 'SirVer/ultisnips'
    use 'honza/vim-snippets'
    use 'windwp/nvim-autopairs'
    -- Fontes para Autocomplete
    use 'hrsh7th/cmp-buffer'
    use 'hrsh7th/cmp-path'
    use 'hrsh7th/cmp-cmdline'
    -- Git Blame
    use 'f-person/git-blame.nvim'
end)

-- Leader key
vim.g.mapleader = " "

-- Telescope
require('telescope').setup {
  defaults = {
    vimgrep_arguments = {
      'rg',
      '--color=never',
      '--no-heading',
      '--with-filename',
      '--line-number',
      '--column',
      '--smart-case'
    },
    prompt_prefix = "🔍 ",
    selection_caret = " ",
    path_display = { "smart" },
    layout_strategy = "horizontal",
    mappings = {
      i = {
        ["<C-j>"] = require('telescope.actions').move_selection_next,
        ["<C-k>"] = require('telescope.actions').move_selection_previous,
        ["<C-n>"] = false,
        ["<C-p>"] = false
      },
      n = {
        ["<C-j>"] = require('telescope.actions').move_selection_next,
        ["<C-k>"] = require('telescope.actions').move_selection_previous,
      }
    }
  }
}

-- TODO comments
require('todo-comments').setup {
  telescope = {
    search = "todos",
  },
}

require('telescope').load_extension('todo-comments')

-- LSP
local lspconfig = require('lspconfig')
lspconfig.pylsp.setup {}

lspconfig.ruff.setup {
  init_options = {
    settings = {
      -- Any extra CLI arguments for `ruff` go here.
      args = {},
    }
  }
}

local capabilities = require('cmp_nvim_lsp').default_capabilities()

lspconfig.cssls.setup {
  capabilities = capabilities,
}

-- Python autocomplete
local cmp = require('cmp')

cmp.setup {
  snippet = {
    expand = function(args)
      vim.fn["UltiSnips#Anon"](args.body)
    end,
  },
  mapping = cmp.mapping.preset.insert({
    ['<C-Space>'] = cmp.mapping.complete(),
    ['<CR>'] = cmp.mapping.confirm({ select = true }),
    ['<Tab>'] = cmp.mapping(function(fallback)
      if cmp.visible() then
        cmp.select_next_item()
      elseif vim.fn["UltiSnips#CanExpandSnippet"]() == 1 then
        vim.fn["UltiSnips#ExpandSnippet"]()
      else
        fallback()
      end
    end, { "i", "s" }),
  }),
  sources = {
    { name = 'nvim_lsp' },
    { name = 'ultisnips' },
    { name = 'buffer' },
    { name = 'path' },
  },
}

cmp.setup.filetype({ "html", "htmldjango" }, {
    sources = cmp.config.sources({
        { name = "nvim_lsp" },
        { name = "buffer" },
        { name = "path" },
    }),
})

-- Treesitter
local treesitter = require('nvim-treesitter.configs')

treesitter.setup {
  ensure_installed = { "python", "javascript", "lua", "html", "css", "htmldjango" },
  highlight = {
    enable = true,
  },
  indent = {
    enable = true,
  },
}

require'treesitter-context'.setup {
  enable = true,
  max_lines = 3,
  trim_scope = 'outer',
  patterns = {
    default = {
      'class',
      'function',
      'method',
      'if',
      'for',
      'while',
      'block',
      'struct',
      'array',
    },
  },
}

-- Null-ls
local null_ls = require("null-ls")

null_ls.setup({
  sources = {
    null_ls.builtins.formatting.ruff.with({
      extra_args = { "--fix", "--select", "I", "--line-length", "79" },
    }),
    null_ls.builtins.formatting.black.with({
      extra_args = { "--line-length", "79" },
    }),
    null_ls.builtins.formatting.isort,
  },
})

-- Lua line
require('lualine').setup {
  sections = {
    lualine_c = {
      { 'filename' },
      { require'nvim-treesitter'.statusline }
    },
  },
}

-- Toggleterm
require("toggleterm").setup {
  size = 30,
  open_mapping = [[<C-t>]],
  hide_numbers = true,
  shade_terminals = true,
  direction = "float",
  float_opts = {
    border = "curved",
    width = 170,
    height = 28,
    winblend = 4,
  },
}

-- Indent blankline
local highlight = {
    "RainbowRed",
    "RainbowYellow",
    "RainbowBlue",
    "RainbowOrange",
    "RainbowGreen",
    "RainbowViolet",
    "RainbowCyan",
}

local hooks = require "ibl.hooks"
-- create the highlight groups in the highlight setup hook, so they are reset
-- every time the colorscheme changes
hooks.register(hooks.type.HIGHLIGHT_SETUP, function()
    vim.api.nvim_set_hl(0, "RainbowRed", { fg = "#E06C75" })
    vim.api.nvim_set_hl(0, "RainbowYellow", { fg = "#E5C07B" })
    vim.api.nvim_set_hl(0, "RainbowBlue", { fg = "#61AFEF" })
    vim.api.nvim_set_hl(0, "RainbowOrange", { fg = "#D19A66" })
    vim.api.nvim_set_hl(0, "RainbowGreen", { fg = "#98C379" })
    vim.api.nvim_set_hl(0, "RainbowViolet", { fg = "#C678DD" })
    vim.api.nvim_set_hl(0, "RainbowCyan", { fg = "#56B6C2" })
end)

require("ibl").setup { indent = { highlight = highlight } }

-- Mason
require("mason").setup({
    ui = {
        icons = {
            package_installed = "✓",
            package_pending = "➜",
            package_uninstalled = "✗"
        },
        check_outdated_packages_on_open = true,
        border = "rounded",
    },
    log_level = vim.log.levels.INFO,
    max_concurrent_installers = 4,
    ensure_installed = {},
    providers = {
        ruby = false,
        php = false,
        java = false,
        perl = false,
    },
})

-- NVIM-Autopairs
require('nvim-autopairs').setup{}

-- CMP capabilities
local capabilities = require('cmp_nvim_lsp').default_capabilities()

lspconfig.pylsp.setup {
    capabilities = capabilities,
}

lspconfig.ruff.setup {
    capabilities = capabilities,
    init_options = {
        settings = {
            args = {},
        }
    }
}

-- Emmet configs
vim.g.user_emmet_leader_key = ','
-- vim.cmd([[autocmd FileType html,htmldjango EmmetInstall]])

lspconfig.emmet_ls.setup({
  capabilities = capabilities,
  filetypes = { "html", "css", "javascript", "typescript", "vue", "htmldjango" },
  init_options = {
    html = {
      options = {
        ["bem.enabled"] = true,
      },
    },
  },
})

lspconfig.html.setup {
    capabilities = capabilities,
    filetypes = { "html", "htmldjango" }, -- Suporte a Jinja
    init_options = {
        provideFormatter = true,
    },
}

-- Some shortcuts
vim.api.nvim_set_keymap('n', '<leader>e', ':NERDTreeToggle<CR>', { noremap = true, silent = true })
vim.api.nvim_set_keymap('n', '<leader>tt', ':Telescope<CR>', { noremap = true, silent = true })
vim.api.nvim_set_keymap('n', '<leader>ff', ':Telescope find_files<CR>', { noremap = true, silent = true })
vim.api.nvim_set_keymap('n', '<leader>fb', ':Telescope buffers<CR>', { noremap = true, silent = true })
vim.api.nvim_set_keymap('n', 'gd', ':Telescope lsp_definitions<CR>', { noremap = true, silent = true })
vim.api.nvim_set_keymap('n', '<leader>td', ':TodoTelescope<CR>', { noremap = true, silent = true })
vim.api.nvim_set_keymap('n', '<leader>fw', ':Telescope live_grep<CR>', { noremap = true, silent = true })
vim.api.nvim_set_keymap('n', '<leader>lg', ':LazyGit<CR>', { noremap = true, silent = true })
vim.api.nvim_set_keymap('n', '<leader>rr', ':lua vim.lsp.buf.format({ async = true })<CR>', { noremap = true, silent = true })
vim.api.nvim_set_keymap('n', '<leader>d', ':echo expand("%:h")<CR>', { noremap = true, silent = true })
vim.api.nvim_set_keymap('n', '<leader>n', ':noh<CR>', { noremap = true, silent = true })
-- Navigation
vim.api.nvim_set_keymap('n', '<C-h>', '<C-w>h', { noremap = true, silent = true })
vim.api.nvim_set_keymap('n', '<C-j>', '<C-w>j', { noremap = true, silent = true })
vim.api.nvim_set_keymap('n', '<C-k>', '<C-w>k', { noremap = true, silent = true })
vim.api.nvim_set_keymap('n', '<C-l>', '<C-w>l', { noremap = true, silent = true })

-- Util mappings
vim.api.nvim_set_keymap("n", "<leader>ht", ":lua ToggleHTMLFileType()<CR>", { noremap = true, silent = true })
vim.api.nvim_set_keymap('i', '<Tab>', 'emmet#expandAbbr()', { silent = true, expr = true })

-- Some configs
vim.cmd('colorscheme retrobox')
vim.wo.number = true
vim.wo.relativenumber = true
vim.o.autoindent = true
vim.o.smartindent = true
vim.o.hlsearch = true
vim.o.incsearch = true
vim.o.tabstop = 4
vim.o.shiftwidth = 4
vim.o.expandtab = true
-- vim.o.wrap = true

vim.api.nvim_create_autocmd("FileType", {
  pattern = { "python", "javascript", "vue" },
  command = "set colorcolumn=80",
})

vim.o.textwidth = 79
vim.o.list = true
vim.o.listchars = "tab:▷ ,trail:·,extends:>,precedes:<,nbsp:␣,space:."
vim.o.foldmethod = 'indent'
vim.o.foldlevel = 99
vim.o.foldenable = true

-- Transparency
-- vim.api.nvim_set_hl(0, 'Normal', { bg = 'none' }) -- Torna o fundo transparente
-- vim.api.nvim_set_hl(0, 'NormalFloat', { bg = 'none' }) -- Torna janelas flutuantes transparentes

-- Possiblie error messages
vim.lsp.set_log_level("WARN")

-- SO shared transfer area
vim.opt.clipboard = "unnamedplus"

-- NVIM env for python
-- pyenv virtualenv 3.10.15 neovim
-- pyenv activate neovim
-- pip install pynvim
-- pip install neovim
-- pyenv deactivate
vim.g.python3_host_prog = "/Users/geneselessa/.pyenv/versions/neovim/bin/python"

-- Disabling some languages
vim.g.loaded_perl_provider = 0
vim.g.loaded_ruby_provider = 0
vim.g.loaded_java_provider = 0
vim.g.loaded_php_provider = 0


-- Side symbols panel
require("symbols-outline").setup({
  highlight_hovered_item = true,
  show_guides = true,
  auto_preview = false,
  position = 'right',
  relative_width = true,
  width = 25,
  auto_close = false,
  show_numbers = false,
  show_relative_numbers = false,
  show_symbol_details = true,
  preview_bg_highlight = 'Pmenu',
  autofold_depth = nil,
  auto_unfold_hover = true,
  fold_markers = { '', '' },
  wrap = false,
  keymaps = { -- These keymaps can be a string or a table for multiple keys
    close = {"<Esc>", "q"},
    goto_location = "<Cr>",
    focus_location = "o",
    hover_symbol = "<C-space>",
    toggle_preview = "K",
    rename_symbol = "r",
    code_actions = "a",
    fold = "h",
    unfold = "l",
    fold_all = "W",
    unfold_all = "E",
    fold_reset = "R",
  },
  lsp_blacklist = {},
  symbol_blacklist = {},
  symbols = {
    File = { icon = "", hl = "@text.uri" },
    Module = { icon = "", hl = "@namespace" },
    Namespace = { icon = "", hl = "@namespace" },
    Package = { icon = "", hl = "@namespace" },
    Class = { icon = "𝓒", hl = "@type" },
    Method = { icon = "ƒ", hl = "@method" },
    Property = { icon = "", hl = "@method" },
    Field = { icon = "", hl = "@field" },
    Constructor = { icon = "", hl = "@constructor" },
    Enum = { icon = "ℰ", hl = "@type" },
    Interface = { icon = "ﰮ", hl = "@type" },
    Function = { icon = "", hl = "@function" },
    Variable = { icon = "", hl = "@constant" },
    Constant = { icon = "", hl = "@constant" },
    String = { icon = "𝓐", hl = "@string" },
    Number = { icon = "#", hl = "@number" },
    Boolean = { icon = "⊨", hl = "@boolean" },
    Array = { icon = "", hl = "@constant" },
    Object = { icon = "⦿", hl = "@type" },
    Key = { icon = "🔐", hl = "@type" },
    Null = { icon = "NULL", hl = "@type" },
    EnumMember = { icon = "", hl = "@field" },
    Struct = { icon = "𝓢", hl = "@type" },
    Event = { icon = "🗲", hl = "@type" },
    Operator = { icon = "+", hl = "@operator" },
    TypeParameter = { icon = "𝙏", hl = "@parameter" },
    Component = { icon = "", hl = "@function" },
    Fragment = { icon = "", hl = "@constant" },
  }
})

-- Some util functions

-- This function allows to toggle between django templates and html
function ToggleHTMLFileType()
  local current_ft = vim.bo.filetype
  if current_ft == "html" then
    vim.bo.filetype = "htmldjango"
    print("Filetype changed to: htmldjango")
  elseif current_ft == "htmldjango" then
    vim.bo.filetype = "html"
    print("Filetype changed to: html")
  else
    print("Current filetype is not html or htmldjango")
  end
end

-- This function adds a fstring when a char { is inserted
vim.api.nvim_create_autocmd("InsertCharPre", {
  pattern = { "*.py" },
  group = vim.api.nvim_create_augroup("py-fstring", { clear = true }),
  ---@param params table
  callback = function(params)
    -- Verifica se o caractere inserido é `{`
    if vim.v.char ~= "{" then return end

    -- Obtém o nó da árvore de sintaxe com Tree-sitter
    local node = vim.treesitter.get_node()

    -- Se não houver um nó, ou se o nó não for uma string, retorne
    if not node then return end
    if node:type() ~= "string" then
      node = node:parent()  -- Verifica o nó pai caso o nó atual não seja uma string
    end

    -- Se não for uma string, retorna
    if not node or node:type() ~= "string" then return end

    -- Obtém o intervalo do nó da string (linha e coluna)
    local row, col, _, _ = vim.treesitter.get_node_range(node)

    -- Obtém o primeiro caractere da string
    local first_char = vim.api.nvim_buf_get_text(params.buf, row, col, row, col + 1, {})[1]

    -- Se já for uma f-string (primeiro caractere é "f"), não faz nada
    if first_char == "f" then return end

    -- Insere o caractere "f" no início da string
    vim.schedule(function() 
      vim.api.nvim_buf_set_text(params.buf, row, col, row, col, { "f" }) 
    end)
  end,
})
