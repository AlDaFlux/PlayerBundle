<?php

namespace Aldaflux\PlayerBundle\DependencyInjection;

use Symfony\Component\Config\Definition\Builder\TreeBuilder;
use Symfony\Component\Config\Definition\ConfigurationInterface;

use Symfony\Component\HttpKernel\Kernel;


class Configuration implements ConfigurationInterface
{
    public function getConfigTreeBuilder()
    {
        $treeBuilder   = new TreeBuilder('player');
        $rootNode = $treeBuilder->getRootNode();
        return $treeBuilder;
    }
}